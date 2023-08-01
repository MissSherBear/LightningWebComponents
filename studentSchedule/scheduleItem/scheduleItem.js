import { LightningElement, api } from 'lwc';

export default class ScheduleItem extends LightningElement {
    @api id;
    @api name;
    @api instructor;
    @api startTime;
    @api endTime;
    @api time;
    @api roomNumber;
    @api building;
    @api classType;

}