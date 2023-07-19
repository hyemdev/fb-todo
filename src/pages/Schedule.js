import moment from "moment/moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { Button, Modal } from "antd";
import "../style/Calendar.css";
// import List from "../components/List";
// import { Form, Route, Routes } from "react-router-dom";

const Schedule = ({ fbName, fbUid, fbEmail, todoData, setTodoData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [day, setDay] = useState(new Date());
    const 서버정보 = [
        {
            // 날짜 포맷 잘 맞추기
            day: "2023-06-20",
            title: "밥",
            price: 5000,
            imgPath:
                "http://image.kmib.co.kr/online_image/2020/1008/611811110015088768_1.jpg",
        },
        {
            day: "2023-06-16",
            title: "짜장",
            price: 10000,
            imgPath:
                "http://image.kmib.co.kr/online_image/2020/1008/611811110015088768_1.jpg",
        },
        {
            day: "2023-06-05",
            title: "햄버거",
            price: 7500,
            imgPath:
                "http://image.kmib.co.kr/online_image/2020/1008/611811110015088768_1.jpg",
        },
    ];

    const handleClickDay = (value, event) => {
        // alert(moment(value).format("YYYY-MM-DD"));
        showModal();
        // console.log(event.currentTarget.querySelector("div").dataset.gogo);
        //data-name으로 지정한 데이터는 dataset으로 캐치할 수 있다
        const div = event.currentTarget.querySelector("div");
        if (div !== null) {
            console.log(div.dataset.gogo);
            const 제목 = div.dataset.gogoTitle;
            const 날짜 = div.dataset.gogoDay;
            const 이미지 = div.dataset.gogoImgpath;
            console.log(`${제목} ${날짜} ${이미지} 있구나`);
        }
    };
    //calendar 내용 출력하기 기능
    const showScheduleJSX = ({ date, view }) => {
        // date,는 calendar에서 출력해준다
        // date 를 우리가 가지고 있는 서버 정보와 비교를 위해서
        // 포맷을 YYYY-MM-DD로 변경한다
        let 날짜 = moment(date).format("YYYY-MM-DD");
        // console.log(date);
        // console.log(날짜);
        let result = 서버정보.find(item => {
            if (item.day === 날짜) {
                console.log("날짜가 같아요, 화면에 내용 출력");
                return item;
            }
        });
        // console.log("result: ", result);
        if (result) {
            return (
                // js의 data 어트리뷰트(data-name)에 정보담기
                <div
                    data-gogo-title={result.title}
                    data-gogo-day={result.day}
                    // data-gogo-imgPath={result.imgPath}
                >
                    <div>{result.title}</div>
                    <div>{result.price}</div>
                    <div>
                        <img src={result.imgPath} />
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="p-6 mt-5 shadow rounded bg-yellow">
            <h1>Schedule</h1>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <>
                untitle
                </>
            </Modal>

            <div>
                <Calendar
                    //날짜 클릭했을 때 이벤트핸들러
                    onClickDay={(value, event) => handleClickDay(value, event)}
                    onChange={setDay}
                    value={day}
                    // 일요일부터 출력하도록 설정하기
                    calendarType="US"
                    formatDay={(locale, date) => moment(date).format("D")}
                    tileContent={showScheduleJSX}
                />
                <div>{moment(day).format("YYYY년 MM월 DD일")}</div>
            </div>
        </div>
    );
};

export default Schedule;
