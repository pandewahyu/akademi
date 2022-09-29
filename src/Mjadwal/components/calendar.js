import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import allLocale from '@fullcalendar/core/locales-all';
import axios from 'axios';
import CreateModal from './create_modal';
import UpdateModal from './update_modal';
import DeleteModal from './delete_modal';
import { isEmptyObject } from 'jquery';
require('./style.css');

import { days, settingHeader, month } from './lang/lang';

const Calendar = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tanggal, setTanggal] = useState([]);
    // const [schedule, setSchedule] = useState({});
    const [eventId, setEventId] = useState(null);
    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState('');
    const calendarRef = useRef(null);

    const onEventAdded = (event) => {
        const api = calendarRef.current.getApi();
        api.addEvent(event);
    };

    const onEventUpdated = (id, newEvent) => {
        const api = calendarRef.current.getApi();
        const event = api.getEventById(id);
        // event.remove();
        // event.setProp(start, newEvent.start);
        console.log(newEvent);
        event.setStart(new Date(newEvent.start));
        event.setEnd(new Date(newEvent.end));
        event.setProp('title', newEvent.title);
        // api.addEvent(newEvent);
    };

    const onEventDeleted = (id) => {
        const api = calendarRef.current.getApi();
        const event = api.getEventById(id);
        event.remove();
    };

    // Buka Create Modal
    const handleClick = (e) => {
        setDate(e.dateStr);
        setTanggal([
            e.dateStr.toString().split('-')[2],
            month[new Date(e.dateStr).getMonth()],
            e.dateStr.toString().split('-')[0],
        ]);
        let dayIndex = new Date(e.dateStr).getDay();
        setDay(days[dayIndex]);
        setCreateModalOpen(true);
    };

    // Buka Update Modal
    const handleEventClick = (e) => {
        const dateStr = e.event.startStr;
        setTanggal([
            e.event.start.toString().split(' ')[2],
            month[new Date(dateStr).getMonth()],
            e.event.start.toString().split(' ')[3],
        ]);
        setDate(dateStr.substring(0, 10));
        let dayIndex = new Date(dateStr).getDay();
        setDay(days[dayIndex]);
        setEventId(e.event.id);
        setUpdateModalOpen(true);
    };

    // Buka Delete Modal
    const handleDeleteEvent = (e) => {
        setDeleteModalOpen(true);
    };

    useEffect(() => {
        getProducts();
        getEmployee();
    }, []);

    // Get Products
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        await axios
            .get('http://localhost:3000/products', {
                withCredentials: true,
            })
            .then((response) => {
                setProducts(response.data);
            });
    };

    // Get Employee
    const [employee, setEmployee] = useState([]);
    const getEmployee = async () => {
        await axios
            .get('http://localhost:3000/employee', {
                withCredentials: true,
            })
            .then((response) => {
                setEmployee(response.data);
            });
    };

    useEffect(() => {
        if (!isEmptyObject(products) && !isEmptyObject(employee)) {
            getEvent();
        }
    }, [products, employee]);

    // Get Event
    const [event, setEvent] = useState([]);
    const getEvent = async () => {
        await axios
            .get('http://localhost:3000/class-schedules', {
                withCredentials: true,
            })
            .then((response) => {
                setEvent(
                    response.data.map((el) => ({
                        backgroundColor: 'green',
                        borderColor: 'green',
                        id: el.id,
                        title: `
                        ${
                            employee.filter((e) => e.id == el.employee_id)[0]
                                .name_employee
                        } -
                            ${
                                products.filter((p) => p.id == el.product_id)[0]
                                    .name
                            }`,
                        start: el.date + 'T' + el.start_time,
                        end: el.date + 'T' + el.end_time,
                    }))
                );
            });
    };

    return (
        <section>
            <div style={{ position: 'relative', zIndex: 0 }}>
                <FullCalendar
                    ref={calendarRef}
                    weekends={true}
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                        listPlugin,
                    ]}
                    initialView='dayGridMonth'
                    dateClick={handleClick}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listWeek',
                    }}
                    buttonText={settingHeader}
                    dayHeaderContent={(arg) => {
                        return days[arg.date.getDay()];
                    }}
                    locales={allLocale}
                    locale='id'
                    dayMaxEvents={true}
                    events={event}
                    eventClick={handleEventClick}
                />
            </div>
            <CreateModal
                tanggal={tanggal}
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onEventAdded={(event) => onEventAdded(event)}
                onDate={date}
                onDay={day}
                employee={employee}
                products={products}
            />
            <UpdateModal
                tanggal={tanggal}
                isOpen={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                onEventUpdated={(id, newEvent) => onEventUpdated(id, newEvent)}
                onDate={date}
                onDay={day}
                deleteButtonOnclick={handleDeleteEvent}
                employee={employee}
                products={products}
                eventId={eventId}
            />
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={(e) => {
                    setDeleteModalOpen(false);
                    setUpdateModalOpen(e);
                }}
                onEventDeleted={(id) => onEventDeleted(id)}
                eventId={eventId}
            />
        </section>
    );
};

export default Calendar;
