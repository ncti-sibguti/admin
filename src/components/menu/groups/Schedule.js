import React, {useEffect, useState} from 'react';
import {Button, Form, Table} from "react-bootstrap";
import {createSchedule} from "../../../api/api";
import ScheduleEditModal from "../modal/ScheduleEditModal";

const Schedule = ({id, schedule, storage}) => {

    const [dayForSchedule, setDayForSchedule] = useState("");
    const [numberPair, setNumberPair] = useState("");
    const [teacherId, setTeacherId] = useState("")
    const [subject, setSubject] = useState("")
    const [classroom, setClassroom] = useState("")
    const [weekType, setWeekType] = useState("")

    const [lessons, setLessons] = useState([]);
    const [groupedLessons, setGroupedLessons] = useState({});

    const dayInWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

    useEffect(() => {
        setLessons(schedule)
    }, [schedule])

    useEffect(() => {
        // Группируем по дням
        const grouped = lessons.reduce((acc, lesson) => {
            if (!acc[lesson.day]) {
                acc[lesson.day] = [];
            }

            acc[lesson.day].push(lesson);
            return acc;
        }, {});

        if (dayInWeek) {
            dayInWeek.map((i) => {
                if (grouped[i])
                    grouped[i].sort((a, b) => a.numberPair - b.numberPair)
            })
        }

        setGroupedLessons(grouped);
    }, [dayInWeek, lessons]);

    const addSchedule = async () => {
        await createSchedule(dayForSchedule, id, numberPair, teacherId, subject, classroom, weekType);
    }

    const [show, setShow] = useState(false)
    const [one, setOne] = useState([{}])


    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Выберите день недели</Form.Label>
                    <Form.Select value={dayForSchedule} onChange={(e) => setDayForSchedule(e.target.value)}
                                 aria-label="Выберите день недели">
                        <option>Выберите день недели</option>
                        <option value={"Понедельник"}>Понедельник</option>
                        <option value={"Вторник"}>Вторник</option>
                        <option value={"Среда"}>Среда</option>
                        <option value={"Четверг"}>Четверг</option>
                        <option value={"Пятница"}>Пятница</option>
                        <option value={"Суббота"}>Суббота</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Номер пары</Form.Label>
                    <Form.Control value={numberPair} type="number" max={"5"} min={"1"} placeholder="Номер пары"
                                  onChange={(e) => setNumberPair(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Предмет</Form.Label>
                    <Form.Control value={subject} type="text" placeholder="Номер кабинета"
                                  onChange={(e) => setSubject(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Выберите преподавателя</Form.Label>
                    <Form.Select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}
                                 aria-label="Выберите преподавателя">
                        <option>Выберите преподавателя</option>
                        {
                            storage.teachers.map(({id, firstname, lastname, surname}) => <option
                                key={id} value={id}> {lastname} {firstname} {surname}</option>)
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Номер кабинета</Form.Label>
                    <Form.Control value={classroom} type="text" placeholder="Номер кабинета"
                                  onChange={(e) => setClassroom(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Тип дня</Form.Label>
                    <Form.Select value={weekType} onChange={(e) => setWeekType(e.target.value)}
                                 aria-label="Выберите день недели">
                        <option>Выберите тип дня</option>
                        <option value={"odd"}>нечетный</option>
                        <option value={"even"}>четный</option>
                        <option value={"const"}>постоянный</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={addSchedule}>
                    Добавить расписание
                </Button>
            </Form>

            {
                schedule.length === 0 &&
                <p>У текущей группы нет расписания</p>
            }
            {
                schedule.length !== 0 &&
                dayInWeek.map((day) =>
                    <Table>
                        <thead>
                        <caption>{day}</caption>
                        <tr>
                            <th>№</th>
                            <th>Предмет</th>
                            <th>Преподаватель</th>
                            <th>Кабинет</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            groupedLessons[day] &&
                            groupedLessons[day].map((i) => (
                                <tr onClick={() => {
                                    setOne(i)
                                    setShow(true)
                                }}>
                                    <td>{i.numberPair}</td>
                                    <td>{i.subject}</td>
                                    <td>{i.teacher.lastname} {i.teacher.firstname} {i.teacher.surname}</td>
                                    <td>{i.classroom}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                )
            }

            <ScheduleEditModal show={show} onHide={() => setShow(false)} subject={one}/>
        </>
    );
};

export default Schedule;