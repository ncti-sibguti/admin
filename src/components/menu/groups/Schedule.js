import React, {useEffect, useState} from 'react';
import {Button, Form, Table} from "react-bootstrap";
import {createSchedule} from "../../../api/api";

const Schedule = ({id, schedule, storage}) => {

    const [dayForSchedule, setDayForSchedule] = useState("");
    const [numberPair, setNumberPair] = useState("");
    const [teacherId, setTeacherId] = useState("")
    const [subjectId, setSubjectId] = useState("")
    const [classroom, setClassroom] = useState("")
    const [weektype, setWeekType] = useState(0)

    const [lessons, setLessons] = useState([]);
    const [groupedLessons, setGroupedLessons] = useState([{}]);

    const dayInWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

    useEffect(() => {
        setLessons(schedule)
    }, [schedule])

    useEffect(() => {
        // Group lessons by day
        if (lessons) {
            const grouped = lessons.reduce((acc, lesson) => {
                if (!acc[lesson.day]) {
                    acc[lesson.day] = [];
                }

                acc[lesson.day].push(lesson);
                return acc;
            }, {});

            // Sort lessons by numberPair within each day
            Object.values(grouped).forEach(dayLessons => {
                dayLessons.sort((a, b) => a.numberPair - b.numberPair);
            });

            setGroupedLessons(grouped);
        }
    }, [lessons]);

    const addSchedule = async () => {
        await createSchedule(dayForSchedule, id, numberPair, teacherId, subjectId, classroom, weektype);
    }

    return (
        <div>
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
                    <Form.Label>Выберите предмет</Form.Label>
                    <Form.Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}
                                 aria-label="Выберите предмет">
                        <option>Выберите предмет</option>
                        {
                            storage.subjects.map(({id, name}) => <option
                                key={id} value={id}> {name}</option>)
                        }
                    </Form.Select>
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
                    <Form.Label>Тип пары(0 - постоянная, 1 - нечетная, 2 - четная)</Form.Label>
                    <Form.Control value={weektype} type="number" max={"2"} min={"0"} placeholder="Тип пары"
                                  onChange={(e) => setWeekType(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={addSchedule}>
                    Добавить расписание
                </Button>
            </Form>

            {
                (schedule && schedule.length === 0) &&
                <p>У текущей группы нет расписания</p>
            }
            {
                (schedule && schedule.length !== 0) &&
                dayInWeek.map((day) =>
                    groupedLessons[day] != null && (
                        <Table>
                            <caption>{day}</caption>
                            <thead>
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
                                    <tr>
                                        <td>{i.numberPair}</td>
                                        <td>{i.subject.name}</td>
                                        <td>{i.teacher.lastname} {i.teacher.firstname} {i.teacher.surname}</td>
                                        <td>{i.classroom}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    ))
            }
        </div>
    );
};

export default Schedule;