import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const TodoChart = () => {
    // 데이터는 백엔드에 요청해서 받는것임.
    const data = [
        { bottle: "365ml", cola: 1200, cidar: 1000, fanta: 1100 },
        { bottle: "500ml", cola: 2200, cidar: 2000, fanta: 2100 },
        { bottle: "1000ml", cola: 3200, cidar: 3000, fanta: 3100 },
    ];

    return (
        <div className="p-6 mt-5 shadow rounded bg-slate-50">
            <h3>TodoChart---</h3>
            <div style={{ width: "400px", height: "400px" }}>
                <ResponsiveBar
                    data={data}
                    // chart에서 보여질 데이터 key (측정되는 값)
                    keys={["cola", "cidar", "fanta"]}
                    // keys를 그룹화하는 index key (분류)
                    indexBy="bottle"
                    // 차트간의 여백 (bar 간의 여백)
                    padding={0.3}
                    // 차트의 색상
                    colors={{ scheme: "pastel1" }}
                    // 색상을 적용함
                    colorBy="id"
                    // 테마설정
                    theme={{
                        // label 스타일 (bar에 표현되는 글씨)
                        labels: {
                            text: {
                                fontSize: 14,
                                fill: "#000000",
                            },
                        },
                        // legend style (우측하단에 있는 색상별 key표시)
                        legends: {
                            text: {
                                fontSize: 11,
                                fill: "#ff0000",
                            },
                        },
                        // axis legend style (bottom, left글씨)
                        axis: {
                            legends: {
                                text: {
                                    fontSize: 20,
                                    fill: "#ff0000",
                                },
                            },
                            ticks: {
                                text: {
                                    fontSize: 16,
                                    fill: "#0000ff",
                                },
                            },
                        },
                    }}
                    // axis bottom 설정
                    axisBottom={{
                        // 값 설명하기 위해 보여지는 점 크기
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    enableGridY={true}
                    enableLabel={false}
                />
            </div>
        </div>
    );
};
export default TodoChart;
