import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getStudentForRunningUser from '@salesforce/apex/Student.getStudentForRunningUser';
import getSectionEnrollments from '@salesforce/apex/Student.getCurrentSectionEnrollmentsForStudent';

export default class StudentSchedule extends LightningElement {
    enrollmentRecordId;
    courses = [];
    error;
    @api recordId;
    @track mondayClasses = [];
    @track tuesdayClasses = [];
    @track wednesdayClasses = [];
    @track thursdayClasses = [];
    @track fridayClasses = [];
    @wire(getSectionEnrollments, { enrollmentRecordId: '$recordId' })
    wiredCourses({ error, data }) {
        if (data) {
            console.log(JSON.stringify(data, null, 2));
            this.courses = this.parseCourseData(data || []);
            this.error = error;
            this.mondayClasses.sort(this.startTimeSort);
            this.tuesdayClasses.sort(this.startTimeSort);
            this.wednesdayClasses.sort(this.startTimeSort);
            this.thursdayClasses.sort(this.startTimeSort);
            this.fridayClasses.sort(this.startTimeSort);
        }
        if (error) {
            console.log({ error });
        }
    }

    handleErrors(error) {
        let message = 'Unknown Error.';
        if (Array.isArray(error.body)) {
            message = error.body.map((e) => e.message).join(', ');
        } else if (typeof error.body.message === 'string') {
            message = error.body.message;
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message,
                variant: 'error'
            })
        );
    }

    createClassFromCourse(course, { startTime, endTime }, id, status) {
        return {
            id: id,
            className: course.name,
            instructor: course.instructorName,
            roomNumber: course.roomNumber,
            subject: course.subject,
            description: course.description,
            creditHours: 'Credits: ' + course.creditHours,
            courseNumber: course.courseNumber,
            building: course.buildingName,
            sectionType: course.sectionType,
            enrollmentStatus: status,
            startTime,
            endTime
        };
    }

    parseCourseData(enrollments = []) {
        return enrollments.map((enrollment) => {
            return enrollment.section?.meetings?.map((meeting, index) => {
                const c = this.createClassFromCourse(
                    enrollment.section,
                    meeting,
                    `${enrollment.section.sectionId}-${index}`,
                    enrollment.enrollmentStatus
                );
                switch (meeting.day.toLowerCase()) {
                    case 'monday':
                        this.mondayClasses.push(c);
                        return c;
                    case 'tuesday':
                        this.tuesdayClasses.push(c);
                        return c;
                    case 'wednesday':
                        this.wednesdayClasses.push(c);
                        return c;
                    case 'thursday':
                        this.thursdayClasses.push(c);
                        return c;
                    case 'friday':
                        this.fridayClasses.push(c);
                        return c;
                    default:
                        console.error('missing day');
                        return c;
                }
            })[0];
        });
    }

    startTimeSort(a, b) {
        if (a.startTime === b.startTime) {
            return 0;
        }
        return a.startTime < b.startTime ? -1 : 1;
    }

    connectedCallback() {
        if (!this.recordId) {
            getStudentForRunningUser()
                .then((result) =>
                    getSectionEnrollments({
                        enrollmentRecordId: result.currentEnrollmentRecordId
                    })
                )
                .then((result) => {
                    this.courses = this.parseCourseData(result || []);
                })
                .catch((error) => this.handleErrors(error));
        }
    }
}