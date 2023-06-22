import axios from "axios";
import { useState } from "react";

// [ 기본형 이미지 업로드 컴포넌트 ]
const UploadFetch = () => {
    // 임시로 올려진 이미지 파일 url을 출력한다.
    const [upLoadImage, setUploadImage] = useState(null);

    const handleFileChange = async event => {
        // 파일을 전달할 주소 (수정할 부분)
        const sendUrl = "/upload";

        // 전송할 키명 (수정할 부분)
        const sendKey = "profileimg";

        // 파일은 배열 즉, files로 전달된다
        // 파일이 1개인 경우, files[0]에 해당파일이 담겨있다.
        const file = event.target.files[0];
        // console.log(file)

        // 전송할 데이터 객체 즉 객체 리터럴을 생성한다.
        // FormData는 html폼의 데이터로서, 폼을 쉽게 전송하도록 도와주는 객체다.
        // body에 객체를 넣어서 http전송을 한다.
        const formData = new FormData();
        console.log(formData);

        // FormData 객체에 속성명: 값 을 추가한다.
        // 이 경우 append() 메서드를 활용한다.
        // append() 메서드는 호출하는 DOM 요소에 새로운 요소 또는 텍스트를 추가합니다
        formData.append(sendKey, file);

        // 전송한다.
        try {
            const res = await fetch(sendUrl, {
                method: "POST",
                body: formData,
                // 파일전송할 때는 아래문장(headers~)이 들어가는게 좋다
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("전송완료", res);

            // ** 임시로 올려진 이미지를 미리보기 하자.
            // URL.createObjectURL(file); url 주소를 만들어줌
            // 아래 메서드는 blob(Binary Large Object)을 생성한다
            // blob은 2진수 데이터를 표현한다
            setUploadImage(URL.createObjectURL(file));
        } catch (error) {
            console.log("업로드 실패", error);
        }
    };
    return (
        <div>
            <h2> 기본형 이미지 업로드 </h2>
            <div>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handleFileChange}
                />
                {/* 꼭 업로드 된 이미지를 확인 할 필요는 없음. */}
                {upLoadImage && (
                    <div>
                        {upLoadImage}
                        <img src={upLoadImage} alt="업로드이미지" />
                    </div>
                )}
            </div>
            <hr />
        </div>
    );
};

// [ 이미지 미리보기 컴포넌트 ]
const UploadPreview = () => {
    // 이미지 미리보기 state
    const [uploadImage, setUploadImage] = useState(null);
    // 업로드 하고나서 컨텐츠 상 보여줄 이미지
    const [charImg, setCharImg] = useState(null);

    // 이미지 선택 처리 핸들러
    const handleFileChange = event => {
        const file = event.target.files[0];
        if (file) {
            //
            const reader = new FileReader();
            // 1.이미지가 임시파일로 웹브라우저에 로드완료 되면
            reader.onloadend = () => {
                //3. (임시파일 읽기가 완료되면)state 변경한다.
                console.log(reader.result);
                setUploadImage(reader.result);
            };
            // 2. 임시 파일을 읽어들인다
            reader.readAsDataURL(file);
        }
    };
    // 임시파일 지우기
    const handleFileRemove = () => {
        setUploadImage(null);
    };

    // 파일 업로드
    const handleFileUpload = async () => {
        // 앞으로 이부분 수정하여 활용하기
        const sendUrl = "/upload";
        const sendKey = "profile";

        if (uploadImage) {
            const formData = new FormData();
            formData.append(sendKey, uploadImage);
            try {
                const res = await fetch(sendUrl, {
                    method: "POST",
                    body: formData,
                    // 파일전송할 때는 아래문장(headers~)이 들어가는게 좋다
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("전송완료", res);

                //서버가 정상적으로 업데이트 되고나서 url줄때
                const serverStatus = res.status.toString();
                console.log(serverStatus.charAt(0));
                //url status값이 2라면(정상작동)
                if (serverStatus.charAt(0) === "2") {
                    // 유효하다면 서버의 이미지 주소를 끌어옴
                    setCharImg("서버의 이미지 주소 URL");
                } else {
                    // url이 유효하지않으면 데모 버전에서 프론트에서 처리
                    setCharImg(uploadImage);
                }
            } catch (error) {
                console.log("데이터 전송실패", error);
            }
        }
    };

    // 화면에 이미지 미리보기 보여주는 함수
    const renderImagePreview = () => {
        if (uploadImage) {
            return (
                <div>
                    {uploadImage}
                    <img src={uploadImage} alt="업로드 이미지" />
                    <button onClick={handleFileRemove}> 지우기 </button>
                    <button onClick={handleFileUpload}> 업로드 </button>
                </div>
            );
        }
        // 아무것도 없으면 null을 반환하자
        return null;
    };

    return (
        <>
            <h2> 이미지 미리보기 </h2>
            <div>
                {/* 이미지 미리보기 출력 */}
                {renderImagePreview()}
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handleFileChange}
                />
            </div>
            {charImg && (
                <div>
                    <h4> 사용자 캐릭터 이미지</h4>
                    <span
                        style={{
                            display: "block",
                            width: "50px",
                            height: "50px",
                            overflow: "hidden",
                            background: "pink",
                        }}
                    >
                        <img
                            src={charImg}
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                        />
                    </span>
                </div>
            )}
            <hr />
        </>
    );
};

// [ axios 이미지 업로드 컴포넌트 ]
const UploadAxios = () => {
    // 이미지 미리보기 state
    const [uploadImage, setUploadImage] = useState(null);
    // 업로드 하고나서 컨텐츠 상 보여줄 이미지
    const [charImg, setCharImg] = useState(null);

    // 이미지 선택 처리 핸들러
    const handleFileChange = event => {
        const file = event.target.files[0];
        if (file) {
            //
            const reader = new FileReader();
            // 1.이미지가 임시파일로 웹브라우저에 로드완료 되면
            reader.onloadend = () => {
                //3. (임시파일 읽기가 완료되면)state 변경한다.
                console.log(reader.result);
                setUploadImage(reader.result);
            };
            // 2. 임시 파일을 읽어들인다
            reader.readAsDataURL(file);
        }
    };
    // 임시파일 지우기
    const handleFileRemove = () => {
        setUploadImage(null);
    };

    // 파일 업로드
    const handleFileUpload = async () => {
        // 앞으로 이부분 수정하여 활용하기
        const sendUrl = "/upload";
        const sendKey = "profile";

        // axios로 변환하기
        if (uploadImage) {
            const formData = new FormData();
            formData.append(sendKey, uploadImage);
            try {
                const res = await axios.post(sendUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("전송완료", res);

                //서버가 정상적으로 업데이트 되고나서 url줄때
                const serverStatus = res.status.toString();
                console.log(serverStatus.charAt(0));
                //url status값이 2라면(정상작동)
                if (serverStatus.charAt(0) === "2") {
                    // 유효하다면 서버의 이미지 주소를 끌어옴
                    setCharImg("서버의 이미지 주소 URL");
                }
            } catch (error) {
                // url이 유효하지않으면 데모 버전에서 프론트에서 처리
                console.log("데이터 전송실패", error);
                setCharImg(uploadImage);
            }
        }
    };

    // 화면에 이미지 미리보기 보여주는 함수
    const renderImagePreview = () => {
        if (uploadImage) {
            return (
                <div>
                    {uploadImage}
                    <img src={uploadImage}  alt="업로드 이미지" />
                    <button onClick={handleFileRemove}> 지우기 </button>
                    <button onClick={handleFileUpload}> 업로드 </button>
                </div>
            );
        }
        // 아무것도 없으면 null을 반환하자
        return null;
    };

    return (
        <>
            <h2> 이미지 미리보기 </h2>
            <div>
                {/* 이미지 미리보기 출력 */}
                {renderImagePreview()}
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handleFileChange}
                />
            </div>
            {charImg && (
                <div>
                    <h4> 사용자 캐릭터 이미지</h4>
                    <span
                        style={{
                            display: "block",
                            width: "50px",
                            height: "50px",
                            overflow: "hidden",
                            background: "pink",
                        }}
                    >
                        <img
                            src={charImg}
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                        />
                    </span>
                </div>
            )}
            <hr />
        </>
    );
};

// JSON 데이터 & 이미지 업로드 & 미리보기 컴포넌트

// 컴포넌트 생성 :
// 1. 대문자로 시작한다
// 2. 별도의 파일로 생성 시에는 파일명.js로 한다
// 부가적으로 옛날에는 파일명.jsx라고 명시했지만, 지금은 파일명.jsx라고 하지 않고도 적용한다.
// 결론은 파일명.js라고 하면 된다~

const UploadJson = () => {
    // state 코딩
    // 1. 선택 이미지 파일에 대한 state
    // 파일이 초기값으로 세팅되어야 할때 : null
    const [selectFile, setSelectFile] = useState(null);

    // 2. json내용에 대한 state
    const [jsonData, setJsonData] = useState("");

    // 3. 미리보기에 위한 state
    //이미지 경로는 문자열 <img src="문자열주소">, 그러므로 초기값을 문자열("")로 두자.
    const [previewImage, setPreviewImage] = useState("");

    // handle 코딩 ( 이벤트 핸들러 )
    // 1. 파일이 선택되었을 때 처리
    const handleChangeFile = event => {
        console.log(event.target.files[0]);
        // 이미지 정보가 어디있는지 찾아서 변수로 저장해두기
        const file = event.target.files[0];

        // set함수에 file을 담아주자.
        setSelectFile(file);

        // 이제 이미지 미리보기에서 보여주면 됨~
        // 1. 복잡하게 처리(코딩이 길어지면)를 해야하는 경우라면 함수를 만들고
        // 2. 정말 짧으면 굳이 함수를 만들어서 처리하지 않는다.
        setPreviewImage(URL.createObjectURL(file)); // 함수없이 간결히 만들자
    };

    // 2. json 내용이 입력되었을 때 처리
    const handleChangeJsonDate = event => {
        //jsonData변수에 값을 담고있다.
        //값을 jsonData로 업데이트 하는 경우, 글자의 앞뒤공백을 없애야한다(중간공백은 제거 X)
        // string method인 trim()을 이용한다
        setJsonData(event.target.value.trim());
    };
    // 3. 전송submit, 즉 ,form의 내용을 전송할 때 처리
    // form의 submit은 사용자가 확인버튼을 누르면 실행된다.

    const handleSubmit = async event => {
        // form에서 submit이 발생하면 웹브라우저가 갱신한다(막아줘야함)
        event.preventDefault();
        console.log("확인클릭");
        // 필수항목을 체크한다 (기획서상 문제)
        // : 이미지 파일이 있는지 (이미지가 없으면 경고창띄움)
        if (!previewImage) {
            alert("이미지를 선택해주세요");
        }
        // : 내용이 있는지 (빈문자열인지 정규표현식으로 체크하자)
        const pattern = /^\s*$/;
        if (pattern.test(jsonData)) {
            alert("내용을 입력해주세요");
        }

        // 전송할 데이터 만들기
        const formData = new FormData();
        formData.append("profile", selectFile);
        // 3-2. 일반적으로는 JSON.stringify(리터럴객체) 포맷
        // 우선순위 2번
        // formData.append("data", JSON.stringify(jsonData));

        // 3-3. spring기반이면 조금 옵션이 필요하다.
        // 우선순위 1번
        const data = new Blob([jsonData], { type: "application/json" });
        formData.append("data", data);

        // 3-1. axios로 전송(이미지, json 동시에 전송)
        try {
            const res = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    // 일반함수 코딩

    // useEffect코딩

    // 이하 JSX자리
    return (
        <>
            <h2> 미리보기 및 이미지, json 업로드 </h2>
            {/* 미리보기 자리 */}
            {/* 자바스크립트 변수 및 기타코딩을 배치할 때는 {내용} 형식을 지켜주자 */}
            {/* { }안에 html을 작성하게 될 때는 (<img src="">) 이런식으로 감싸주자(1줄일때는 소괄호가 사라지지만, 2줄이상이면 유지된다.) */}
            {previewImage && <img src={previewImage} alt="미리보기" />}
            {/* 데이터 선택 및 전송할 내용 입력 */}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* htmlFor="아이디"는 html태그의 for="아이디"와 같다 */}
                    {/* label과 input을 id로 연결시킨다  */}
                    <label htmlFor="gogo"> 1. 이미지 선택 </label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        id="gogo"
                        onChange={handleChangeFile}
                    />
                </div>
                <div>
                    <label htmlFor="lolo"> 2. 내용입력 </label>
                    {/* 코딩 시 textarea 태그는 절대로 enter키로 정리하지 않는다. */}
                    <textarea
                        id="lolo"
                        className="border"
                        value={jsonData}
                        onChange={handleChangeJsonDate}
                    ></textarea>
                </div>
                <div>
                    {/* type값을 안넣어도 default값이 submit임. 하지만 type값을 적어주자!(추후 혼동방지) */}
                    {/* 일반태그에 button의 default값은 button임 */}
                    <button type="submit"> 확인 </button>
                </div>
            </form>
            <hr />
        </>
    );
};

// 다중 이미지 전송 컴포넌트
const UploadMulti = () => {
    // state 코딩
    // 다중선택이므로 초기값을 []배열로 두자
    const [selectFile, setSelectFile] = useState([]);
    const [jsonData, setJsonData] = useState("");
    const [previewImage, setPreviewImage] = useState([]);

    // handle 코딩 ( 이벤트 핸들러 )
    const handleChangeFile = event => {
        // console.log(event.target.files[0]);
        // 여러개를 담아야하니 배열로 바꾸자
        const files = Array.from(event.target.files);

        // state 변수에 선택된 파일이 여러개이므로 files배열을 저장한다.
        setSelectFile(files);

        // 화면에 보여줄 이미지의 url문자열을 만들어야 한다.
        const imgPaths = files.map(item => URL.createObjectURL(item));
        console.log(imgPaths)
        setPreviewImage(imgPaths);
    };

    // 2. json 내용이 입력되었을 때 처리
    const handleChangeJsonDate = event => {
        setJsonData(event.target.value.trim());
    };

    const handleSubmit = async event => {
        event.preventDefault();
        console.log("확인클릭");

        if (!previewImage) {
            alert("이미지를 선택해주세요");
        }

        const pattern = /^\s*$/;
        if (pattern.test(jsonData)) {
            alert("내용을 입력해주세요");
        }

        // 전송할 데이터 만들기
        const formData = new FormData();
        
        // 파일이 어러개 즉, 배열이다
        // formData.append("profile", selectFile);
        selectFile.forEach((item, index)=>{
            formData.append(`profile${index}`, item)
        })

        const data = new Blob([jsonData], { type: "application/json" });
        formData.append("data", data);

        // 3-1. axios로 전송(이미지, json 동시에 전송)
        try {
            const res = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h2> 다중이미지 업로드 (& 미리보기 및 이미지,json 전송)</h2>
            {/* 미리보기 자리 */}
            {/* 배열.map ((요소 1개) => {요소에 처리})*/}
            {/* 이미지가 여러개이므로 map이 필요하다 */}
            {/* jsx를 리턴할때 {return(코딩자리)} 이지만 {}와 return은 생략가능하다 */}
            <div>
                {previewImage.map((item, index) => (
                    <img src={item} key={index} width={"100px"} alt="그림" />
                ))}
            </div>
            {/* 데이터 선택 및 전송할 내용 입력 */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="gogo"> 1. 이미지 선택 </label>
                    {/* 옵션에 multiple로 넣어줘야 다중선택이 된다 */}
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        id="gogo"
                        onChange={handleChangeFile}
                        multiple
                    />
                </div>
                <div>
                    <label htmlFor="lolo"> 2. 내용입력 </label>
                    <textarea
                        id="lolo"
                        className="border"
                        value={jsonData}
                        onChange={handleChangeJsonDate}
                    ></textarea>
                </div>
                <div>
                    <button type="submit"> 확인 </button>
                </div>
            </form>
            <hr />
        </>
    );
};

const Upload = () => {
    // js코딩

    //이하는 JSX타이핑
    return (
        <div className="p-6 mt-5 shadow-md rounded-md bg-white">
            <h1> Upload </h1>
            {/* <UploadFetch /> */}
            {/* <UploadPreview /> */}
            {/* <UploadAxios /> */}
            {/* <UploadJson /> */}
            <UploadMulti />
        </div>
    );
};
export default Upload;
