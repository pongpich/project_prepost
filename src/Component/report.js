import React, { useState, useEffect } from "react";
import LoGo from "../Ramlogo.png";
import Mouth from "../mouth.png";
import { useParams } from "react-router";
import axios from "axios";
import BaseUrl from "../api/BaseUrl";
import ReactLoading from "react-loading";
import Barcode from "react-barcode";
import {
  formatYearMonthDayTime,
  formatDayMonthYearTimeThai,
  currentYearMonthDay,
} from "../utils/utils.js";
import urlencode from "urlencode";
import { nl2br } from 'react-js-nl2br';

function Report() {
  const [header, setHeader] = useState([]);
  const [patient, setPatient] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [paperinfo, setPaperinfo] = useState([]);
  const [transfer, setTransfer] = useState([]);
  const [vsinfo, setVsinfo] = useState([]);
  const [body, setBody] = useState();
  const [table, setTable] = useState("PTSTBL    ");
  const [type, setType] = useState("PTS1      ");
  const [done, setDone] = useState(true);
  const [ocr, setOcr] = useState([]);
  const { ocmnum, chtnum, seq, user } = useParams();
  const nl2br = require('react-nl2br');
  // const [userinfo, setUserinfo] = useState([]);
  const [teststate, setTeststate] = useState([]);
  const [teststate2, setTeststate2] = useState([]);
  const [teststate3, setTeststate3] = useState([]);

  //pre-op summary
  let setData1 = [];
  let setData2 = [];
  let setData090 = [];

  let test1 = [];
  let test2 = [];
  let test3 = [];



  useEffect(() => {
    getPatientInfo();
  }, []);

  const getPatientInfo = async () => {
    const request_Patient_Report = {
      params: {
        dbServiceName: "HSPatientInfo",
        ocmnum: ocmnum,
      },
    };
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_Patient_Report
      )
      .then((response) => {
        const responseData = response.data.result;
        setPatient(response.data.result);
        console.log("patient", responseData);
        getBody1();
        // getUserinfo();
        // getPaperinfo();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   getBody();
  // }, [header]);

  const getBody1 = async () => {
    let setRequst = [];
    for (let i = 37; i <= 60; i++) {
      const requestBody = {
        params: {
          dbServiceName: "SWPatientForm",
          ocmnum: ocmnum,
          chtnum: chtnum,
          table: "OPTNTBL",
          type: "OPT6",
          topic: "OPT0" + [i],
          seq: seq
        }
      };
      setRequst.push(
        await axios
          .get(
            `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
            requestBody
          )
          .then((response) => {
            test1.push(response.data.result);
          })
          .catch((error) => console.error(error))
      );
    }
    console.log(test1, 'test1');
    setTeststate(test1);

    getBody2();
  }

  const getBody2 = async () => {
    let setRequst = [];
    // const xx3 = [
    //   {
    //     "code": "OPT038001 ",
    //     "textValue": "Test",
    //     "dataType": "RADIO",
    //     "chtnum": " 900003 ",
    //     "require": "",
    //     "title": "G.A.",
    //     "type": "OPT6 ",
    //     "codeValue": "Y",
    //     "datetime": "202301261333",
    //     "topic": "OPT090 ",
    //     "formNum": "2650",
    //     "ocmnum": " 13472689",
    //     "user": "W32 ",
    //     "seq": "107702",
    //     "table": "OPTNTBL "
    //   },
    //   {
    //     "code": "OPT038002 ",
    //     "textValue": "ahhh",
    //     "dataType": "RADIO",
    //     "chtnum": " 900003 ",
    //     "require": "",
    //     "title": "R.A.",
    //     "type": "OPT6 ",
    //     "codeValue": "Y",
    //     "datetime": "202301261310",
    //     "topic": "OPT090 ",
    //     "formNum": "2650",
    //     "ocmnum": " 13472689",
    //     "user": "W32 ",
    //     "seq": "107610",
    //     "table": "OPTNTBL "
    //   },
    //   {
    //     "code": "OPT038003 ",
    //     "textValue": "Test",
    //     "dataType": "RADIO",
    //     "chtnum": " 900003 ",
    //     "require": "",
    //     "title": "MAC Problem",
    //     "type": "OPT6 ",
    //     "codeValue": "Y",
    //     "datetime": "202301261334",
    //     "topic": "OPT090 ",
    //     "formNum": "2650",
    //     "ocmnum": " 13472689",
    //     "user": "W32 ",
    //     "seq": "107691",
    //     "table": "OPTNTBL "
    //   },
    //   {
    //     "code": "OPT038005 ",
    //     "textValue": "Test",
    //     "dataType": "TEXT",
    //     "chtnum": " 900003 ",
    //     "require": "",
    //     "title": "Previous Medication",
    //     "type": "OPT6 ",
    //     "codeValue": "",
    //     "datetime": "202301261331",
    //     "topic": "OPT090 ",
    //     "formNum": "2650",
    //     "ocmnum": " 13472689",
    //     "user": "W32 ",
    //     "seq": "107692",
    //     "table": "OPTNTBL "
    //   },
    //   {
    //     "code": "OPT038006 ",
    //     "textValue": "Test",
    //     "dataType": "TEXT",
    //     "chtnum": " 900003 ",
    //     "require": "",
    //     "title": "Family Hx",
    //     "type": "OPT6 ",
    //     "codeValue": "",
    //     "datetime": "202301261331",
    //     "topic": "OPT090 ",
    //     "formNum": "2650",
    //     "ocmnum": " 13472689",
    //     "user": "W32 ",
    //     "seq": "107693",
    //     "table": "OPTNTBL "
    //   },
    //   {
    //     "code": "OPT038007 ",
    //     "textValue": "",
    //     "dataType": "RADIO",
    //     "chtnum": " 900003 ",
    //     "require": "",
    //     "title": "Alcohol",
    //     "type": "OPT6 ",
    //     "codeValue": "Y",
    //     "datetime": "202301261333",
    //     "topic": "OPT090 ",
    //     "formNum": "2650",
    //     "ocmnum": " 13472689",
    //     "user": "W32 ",
    //     "seq": "107703",
    //     "table": "OPTNTBL "
    //   },
    //   {
    //     "code": "OPT038008 ",
    //     "textValue": "",
    //     "dataType": "RADIO",
    //     "chtnum": " 900003 ",
    //     "require": "",
    //     "title": "Smoking",
    //     "type": "OPT6 ",
    //     "codeValue": "Y",
    //     "datetime": "202301261331",
    //     "topic": "OPT090 ",
    //     "formNum": "2650",
    //     "ocmnum": " 13472689",
    //     "user": "W32 ",
    //     "seq": "107694",
    //     "table": "OPTNTBL "
    //   },
    //   {
    //     "code": "OPT038009 ",
    //     "textValue": "",
    //     "dataType": "RADIO",
    //     "chtnum": " 900003 ",
    //     "require": "",
    //     "title": "Drugs Allergy",
    //     "type": "OPT6 ",
    //     "codeValue": "Y",
    //     "datetime": "202301261333",
    //     "topic": "OPT090 ",
    //     "formNum": "2650",
    //     "ocmnum": " 13472689",
    //     "user": "W32 ",
    //     "seq": "107704",
    //     "table": "OPTNTBL "
    //   }
    // ];
    for (let i = 61; i <= 75; i++) {
      const requestBody = {
        params: {
          dbServiceName: "SWPatientForm",
          ocmnum: ocmnum,
          chtnum: chtnum,
          table: "OPTNTBL",
          type: "OPT5",
          topic: "OPT0" + [i],
          seq: seq
        }
      };
      setRequst.push(
        await axios
          .get(
            `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
            requestBody
          )
          .then((response) => {
            test2.push(response.data.result);
            // test3.push(xx3);
          })
          .catch((error) => console.error(error))
      );
    }
    console.log(test2, 'test2');
    setTeststate2(test2);
    getBody090();

    // console.log(test3, 'test3')
    // setTeststate3(test3);
  }

  const getBody090 = async () => {
    let setRequst = [];

    const requestBody = {

      params: {
        dbServiceName: "SWPatientForm",
        ocmnum: ocmnum,
        chtnum: chtnum,
        table: "OPTNTBL",
        type: "OPT6",
        topic: "OPT090",
        seq: seq
      }
    };
    setRequst.push(
      await axios
        .get(
          `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
          requestBody
        )
        .then((response) => {
          test3.push(response.data.result);

        })
        .catch((error) => console.error(error))
    );

    console.log(test3, 'test3');
    setTeststate3(test3);

    // if (test1.length > 0) {
    //   // console.log("Body", setData);
    //   // await getOcrNumber();
    //   // await getData();
    //   await setDone(true);
    // }
  }

  function rerunocr() {
    getOcrNumber();
  }

  const getOcrNumber = () => {
    if (user.trim()) {
      console.log(ocmnum.trim());

      const request_config = {
        params: {
          prm_ocm: urlencode(ocmnum.trim()), //ocm
          prm_date: urlencode(currentYearMonthDay()), //date
          prm_type: urlencode("AOP53"), //รหัสเอกสาร
          prm_user: urlencode(user), //user ใช้งาน
        },
      };

      axios
        .get(
          `http://10.100.212.182/AWSqlConnect/RequestOCR.php`,
          request_config
        )
        .then(async (response) => {
          try {
            let responseData = await response.data;
            await setOcr(responseData);
            await setTimeout(() => {
              window.print();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => console.error(error));
    }
    // setTimeout(() => {
    //   window.print();
    // }, 4000);
  };
  return (
    <>

      {teststate.length && teststate2.length && teststate3.length
        ?

        <div className=" ">
          {!done ? null : (
            <div className=" px-5 py-2 w-screen text-3xl font-bold shadow-lg items-center bg-slate-50 flex space-x-6 mb-3">
              {/* <img src={LoGo} className=" " width="300" alt="" /> */}
              <p classname="">Pre-Post Anesthesia Evaluation Record</p>
              <button
                // onClick={rerunocr}
                onClick={() => {
                  getOcrNumber();
                }}
                className=" border-black rounded-md hover:bg-indigo-900 h-10  hover:text-white border parafont2 px-5 "
              >
                Print
              </button>
            </div>
          )}
          <div >
            <page
              size="A4"
              id="section-to-print"
              className="div-container-print "
            >
              <thead>
                {/* page1 */}
                <header className="grid grid-cols-3 parafont" style={{ marginBottom: "10px" }}>
                  <div className="header-1 ">
                    <div className="border border-black  border-r-0 border-b-0 pl-5 place-items-center">
                      <img src={LoGo} className=" w-11/12" alt="" />
                      {/* <div className="col-span-3 ">
              <p>โรงพยาบาลรามคำแหง</p>
              <p className="text-xxs uppercase">Ramkhamhaeng Hospital</p>
              <p className="text-xxs">https://www.ram-hosp.co.th</p>
            </div> */}
                    </div>
                    <div className="border border-black border-r-0 grid grid-cols-4  place-items-center" style={{ height: "67px" }}>
                      <div className=" col-span-4 text-center">
                        <b>
                          Pre-Post Anesthesia Evaluation Record
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="border border-black border-r-0 p-1 -mr-10 space-y-1 pt-0.5" style={{ lineHeight: "21px" }}>
                    {patient.map((data, i) => (
                      <>
                        <div key={i} className="flex space-x-4">
                          <p className="font-bold">Name:</p>
                          &nbsp;{data.name}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Birthday: </p>
                          &nbsp;{data.BirthDte}{" "}
                          <p className="font-bold">Age (Y.M.D):</p>
                          &nbsp;{data.age}
                        </div>
                        <div className="flex space-x-4 "></div>
                        <div className="flex space-x-4">
                          <p className="font-bold">HN: </p>
                          &nbsp;{data.hn}
                          <p className="font-bold">AN: </p>
                          &nbsp;{data.AN_VN}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Room: </p>
                          &nbsp;{data.room}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Register date: </p>
                          {/* &nbsp;{data.registerDatetime} */}
                          <br />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="border overflow-hidden border-black ml-5 place-items-center center-kit">
                    {ocr.length > 0 ? (
                      <div className="text-white headertitleocr mt-1.5">
                        +{ocr[0].Return}+
                      </div>
                    ) : null}
                    <div className="hidden mt-7 font-thin">
                      {patient.map((data, i) => (
                        <Barcode
                          height="25"
                          width="1"
                          displayValue="false"
                          format="CODE39"
                          // textMargin={2}
                          // fontSize={20}
                          value={data.hn}
                        />
                      ))}
                    </div>
                  </div>
                </header>
              </thead>
              <tbody>
                <header className="grid grid-cols-1 parafont" style={{ marginBottom: "10px", lineHeight: "normal" }}>
                  <div className="header-1 ">
                    <div className="border border-black   border-b-0 pl-1 place-items-center">
                      {/* <div>
                      ............................................................................................................................................................................................
                    </div> */}
                      <div className=" grid grid-cols-5 gap-3 " style={{}}>
                        <div className=" col-span-3 parafont">
                          {teststate[0][0].textValue
                            ? <p className=" fontpage">Pre-op evaluated by Doctor : &emsp; {teststate[0][0].textValue} </p>
                            : <p className=" fontpage">Pre-op evaluated by Doctor :  ...................................................................................................................... at</p>
                          }
                        </div>


                        <div className=" col-span-2 ">
                          <div className=" grid grid-cols-4 gap-3 my-1" >
                            <div className=" col-span-1 fontpage">
                              <div id="squares">
                                {teststate[0][1].codeValue === "Y"
                                  ? <div id="square1"><p style={{ fontSize: "18px", marginTop: "-12px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  : <div id="square1"></div>
                                }
                              </div>
                              ward
                            </div>
                            <div className=" col-span-1 fontpage">
                              <div id="squares">
                                {teststate[0][2].codeValue === "Y"
                                  ? <div id="square1"><p style={{ fontSize: "18px", marginTop: "-12px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  : <div id="square1"></div>
                                }
                              </div>
                              OR
                            </div>

                            <div className=" col-span-2 fontpage">
                              {teststate[0][3].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-12px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  {teststate[0][3].textValue}
                                </div>

                                : <div id="squares"><div id="square1"></div>............................................</div>
                              }

                            </div>

                          </div>
                        </div>

                      </div>
                      <div className=" grid grid-cols-3 gap-3 " style={{}}>
                        <div className=" col-span-1 parafont">
                          {teststate[0][4].datetime
                            ? <p className=" fontpage">Date of Operation  &emsp;&emsp;{teststate[0][4].datetime.substring(6, 8)}/{teststate[0][4].datetime.substring(4, 6)}/{teststate[0][4].datetime.substring(0, 4)}&emsp; {teststate[0][4].datetime.substring(8, 10)}:{teststate[0][4].datetime.substring(10, 12)}</p>
                            : <p className=" fontpage">Date of Operation  ...................................................................</p>
                          }
                        </div>
                        <div className=" col-span-1 parafont">
                          {teststate[0][5].textValue
                            ? <p className=" fontpage">Surgeon  &emsp;&emsp;{teststate[0][5].textValue}</p>
                            : <p className=" fontpage">Surgeon  .................................................................................</p>
                          }
                        </div>
                        <div className=" col-span-1 parafont">
                          {teststate[0][6].textValue
                            ? <p className=" fontpage">Anesthesiologist  &emsp;&emsp;{teststate[0][6].textValue}</p>
                            : <p className=" fontpage">Anesthesiologist  ...................................................................</p>
                          }
                        </div>

                      </div>
                    </div>
                    <div className=" grid grid-cols-11  border border-black   border-b-0 " style={{}}>
                      <div className=" col-span-6 parafont border border-black  border-y-0 border-l-0 pl-1" style={{ lineHeight: "20px" }}>
                        <h3><b>HISTORY :</b></h3>
                        <div className=" grid grid-cols-6  " style={{}}>
                          <div className=" col-span-2 parafont">
                            <p className=" fontpage">Previous Anesthesia</p>
                          </div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              {teststate3[0][0].codeValue === "Y"
                                ? <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                : <div id="square1"></div>
                              }
                            </div>
                            G.A
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-15px" }}>
                            <div id="squares">
                              {teststate3[0][1].codeValue === "Y"
                                ? <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                : <div id="square1"></div>
                              }
                            </div>
                            R.A
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-18px" }}>
                            {teststate3[0][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                MAC Problem &emsp;{teststate3[0][2].textValue}
                              </div>

                              : <div id="squares"><div id="square1"></div>MAC Problem ............................</div>
                            }
                          </div>
                        </div>
                        {teststate3[0][3].textValue
                          ? <p className=" fontpage">Previous Medication  &emsp;&emsp;{teststate3[0][3].textValue}</p>
                          : <p className=" fontpage">Previous Medication  ...................................................................................................................................</p>
                        }
                        {teststate3[0][4].textValue
                          ? <p className=" fontpage">Family Hx  &emsp;&emsp;{teststate3[0][4].textValue}</p>
                          : <p className=" fontpage">Family Hx  ....................................................................................................................................................</p>
                        }
                        <div className=" grid grid-cols-4  " style={{ paddingLeft: "20px" }}>

                          <div className=" col-span-1 fontpage">
                            {teststate3[0][5].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Alcohol
                              </div>

                              : <div id="squares"><div id="square1"></div>Alcohol</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-15px" }}>
                            {teststate3[0][6].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Smoking
                              </div>

                              : <div id="squares"><div id="square1"></div>Smoking</div>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-18px" }}>
                            {teststate3[0][7].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Drugs Allergy  &emsp;{teststate3[0][7].textValue}
                              </div>

                              : <div id="squares"><div id="square1"></div>Drugs Allergy .....................................................</div>
                            }
                          </div>
                        </div>
                        <h3><b>Personal Hx :</b></h3>
                        <div className=" grid grid-cols-8 gap-3 my-1" >
                          <div className=" col-span-3 parafont">
                            <p className=" fontpage">Functional Class [NYHA] :  </p></div>
                          <div className=" col-span-1 fontpage">
                            {teststate[3][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                1
                              </div>

                              : <div id="squares"><div id="square1"></div>1</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage">
                            {teststate[3][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                2
                              </div>

                              : <div id="squares"><div id="square1"></div>2</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage">
                            {teststate[3][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                3
                              </div>

                              : <div id="squares"><div id="square1"></div>3</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage">
                            {teststate[3][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                4
                              </div>

                              : <div id="squares"><div id="square1"></div>4</div>
                            }
                          </div>

                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">RS  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            {teststate[4][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>

                              : <div id="squares"><div id="square1"></div>WNL</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            {teststate[4][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                URI
                              </div>

                              : <div id="squares"><div id="square1"></div>URI</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            {teststate[4][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                LRI
                              </div>

                              : <div id="squares"><div id="square1"></div>LRI</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[4][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Asthma
                              </div>

                              : <div id="squares"><div id="square1"></div>Asthma</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[4][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Effusion
                              </div>

                              : <div id="squares"><div id="square1"></div>Effusion</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[4][5].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Obstruction
                              </div>

                              : <div id="squares"><div id="square1"></div>Obstruction</div>
                            }
                          </div>

                        </div>

                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">CVS  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            {teststate[5][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>

                              : <div id="squares"><div id="square1"></div>WNL</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            {teststate[5][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                HT
                              </div>

                              : <div id="squares"><div id="square1"></div>HT</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            {teststate[5][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                IHD
                              </div>

                              : <div id="squares"><div id="square1"></div>IHD</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[5][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                CHD
                              </div>

                              : <div id="squares"><div id="square1"></div>CHD</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[5][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                CHF
                              </div>

                              : <div id="squares"><div id="square1"></div>CHF</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[5][5].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Arrthymia
                              </div>

                              : <div id="squares"><div id="square1"></div>Arrthymia</div>
                            }
                          </div>

                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">CNS  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            {teststate[6][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>

                              : <div id="squares"><div id="square1"></div>WNL</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            {teststate[6][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                SCI
                              </div>

                              : <div id="squares"><div id="square1"></div>SCI</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            {teststate[6][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                CVA
                              </div>

                              : <div id="squares"><div id="square1"></div>CVA</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[6][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                IICP
                              </div>

                              : <div id="squares"><div id="square1"></div>IICP</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[6][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Seizure
                              </div>

                              : <div id="squares"><div id="square1"></div>Seizure</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[6][5].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Alt. of Conscious
                              </div>

                              : <div id="squares"><div id="square1"></div>Alt. of Conscious</div>
                            }
                          </div>

                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" style={{ paddingLeft: "30px" }}>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">GI  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            {teststate[7][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>

                              : <div id="squares"><div id="square1"></div>WNL</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            {teststate[7][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Full stomach
                              </div>

                              : <div id="squares"><div id="square1"></div>Full stomach</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage">
                            {teststate[7][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Ascites
                              </div>

                              : <div id="squares"><div id="square1"></div>Ascites</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            {teststate[7][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Jaundice
                              </div>

                              : <div id="squares"><div id="square1"></div>Jaundice</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            {teststate[7][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Cirrhosis
                              </div>

                              : <div id="squares"><div id="square1"></div>Cirrhosis</div>
                            }
                          </div>


                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" style={{ paddingLeft: "30px" }}>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">GU  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            {teststate[8][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>

                              : <div id="squares"><div id="square1"></div>WNL</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            {teststate[8][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                UTI
                              </div>

                              : <div id="squares"><div id="square1"></div>UTI</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            {teststate[8][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                ARF
                              </div>

                              : <div id="squares"><div id="square1"></div>ARF</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[8][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                ESRD
                              </div>

                              : <div id="squares"><div id="square1"></div>ESRD</div>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[8][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Renal Insufficiency
                              </div>

                              : <div id="squares"><div id="square1"></div>Renal Insufficiency</div>
                            }
                          </div>


                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Endoc  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            {teststate[9][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>

                              : <div id="squares"><div id="square1"></div>WNL</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            {teststate[9][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                DM
                              </div>

                              : <div id="squares"><div id="square1"></div>DM</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            {teststate[9][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Thyroid
                              </div>

                              : <div id="squares"><div id="square1"></div>Thyroid</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[9][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Adrenal
                              </div>

                              : <div id="squares"><div id="square1"></div>Adrenal</div>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-45px" }}>
                            {teststate[9][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Autoimmune Disease
                              </div>

                              : <div id="squares"><div id="square1"></div>Autoimmune Disease</div>
                            }
                          </div>


                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Hemato  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            {teststate[10][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>

                              : <div id="squares"><div id="square1"></div>WNL</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            {teststate[10][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Anemia
                              </div>

                              : <div id="squares"><div id="square1"></div>Anemia</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-35px" }}>
                            {teststate[10][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Coagulopathy
                              </div>

                              : <div id="squares"><div id="square1"></div>Coagulopathy</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-15px" }}>
                            {teststate[10][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Hepatitis
                              </div>

                              : <div id="squares"><div id="square1"></div>Hepatitis</div>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-15px" }}>
                            {teststate[10][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                HIV
                              </div>

                              : <div id="squares"><div id="square1"></div>HIV</div>
                            }
                          </div>


                        </div>
                        {teststate[11][0].textValue != ""
                          ?
                          <p className="fontpage">Note : {teststate[11][0].textValue}</p>

                          : <p className="fontpage">Note : .........................................................................................................................................................</p>
                        }

                      </div>




                      <div className=" col-span-5 parafont pl-1 lab" style={{ lineHeight: "20px" }}>
                        <h3><b>LABORATORY :</b></h3>
                        <div className=" grid grid-cols-5  my-1" >
                          <div className=" col-span-2 parafont">
                            {teststate[18][0].textValue != ""
                              ? <p className=" fontpage">CBC:Hct &emsp; {teststate[18][0].textValue}  </p>
                              : <p className=" fontpage">CBC:Hct .........................................  </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont">
                            {teststate[18][1].textValue != ""
                              ? <p className=" fontpage">Hb &emsp; {teststate[18][1].textValue}  </p>
                              : <p className=" fontpage">Hb .....................  </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont">
                            {teststate[18][2].textValue != ""
                              ? <p className=" fontpage">WBC {teststate[18][2].textValue}  </p>
                              : <p className=" fontpage">WBC ..................  </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont">
                            {teststate[18][3].textValue != ""
                              ? <p className=" fontpage">Plt {teststate[18][3].textValue}  </p>
                              : <p className=" fontpage">Plt ......................  </p>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-3  my-1" >
                          <div className=" col-span-1 parafont">
                            {teststate[18][4].textValue != ""
                              ? <p className=" fontpage">ฺBS  &emsp; {teststate[18][4].textValue}  </p>
                              : <p className=" fontpage">ฺBS .......................................  </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont">
                            {teststate[18][5].textValue != ""
                              ? <p className=" fontpage">BUN  &emsp; {teststate[18][5].textValue}  </p>
                              : <p className=" fontpage">BUN .......................................  </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont">
                            {teststate[18][6].textValue != ""
                              ? <p className=" fontpage">CR  &emsp; {teststate[18][6].textValue}  </p>
                              : <p className=" fontpage">CR .......................................  </p>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-5  my-1 parafont" >
                          <div className=" col-span-1">
                            <p className=" fontpage">Electrolytes : </p>
                          </div>
                          <div className=" col-span-1">
                            {teststate[18][7].textValue != ""
                              ? <p className=" fontpage">NA  &nbsp; {teststate[18][7].textValue}  </p>
                              : <p className=" fontpage">NA ......................  </p>
                            }
                          </div>
                          <div className=" col-span-1">
                            {teststate[18][8].textValue != ""
                              ? <p className=" fontpage">K  &nbsp; {teststate[18][8].textValue}  </p>
                              : <p className=" fontpage">K ......................  </p>
                            }
                          </div>
                          <div className=" col-span-1">
                            {teststate[18][9].textValue != ""
                              ? <p className=" fontpage">CI  &nbsp; {teststate[18][9].textValue}  </p>
                              : <p className=" fontpage">CI ......................  </p>
                            }
                          </div>
                          <div className=" col-span-1">
                            {teststate[18][10].textValue != ""
                              ? <p className=" fontpage">CO2  &nbsp; {teststate[18][10].textValue}  </p>
                              : <p className=" fontpage">CO2 ....................  </p>
                            }
                          </div>
                        </div>
                        {teststate[18][11].textValue != ""
                          ? <p className="fontpage">LFT  &emsp; {teststate[18][11].textValue}</p>
                          : <p className="fontpage">LFT  .......................................................................................................................................</p>
                        }
                        <div className=" grid grid-cols-2  my-1 parafont" >
                          <div className=" col-span-1">
                            {teststate[18][12].textValue != ""
                              ? <p className="fontpage">Coagulation  &emsp; {teststate[18][12].textValue}</p>
                              : <p className="fontpage">Coagulation  .................................................</p>
                            }
                          </div>
                          <div className=" col-span-1">
                            {teststate[18][13].textValue != ""
                              ? <p className="fontpage">INR  &emsp; {teststate[18][13].textValue}</p>
                              : <p className="fontpage">INR  .............................................................. </p>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-2  my-1 parafont" >
                          <div className=" col-span-1">
                            {teststate[18][14].textValue != ""
                              ? <p className="fontpage">HIV  &emsp; {teststate[18][14].textValue}</p>
                              : <p className="fontpage">HIV  .............................................................. </p>
                            }
                          </div>
                          <div className=" col-span-1">
                            {teststate[18][15].textValue != ""
                              ? <p className="fontpage">HBV  &emsp; {teststate[18][15].textValue}</p>
                              : <p className="fontpage">HBV  .............................................................. </p>
                            }
                          </div>
                        </div>
                        {teststate[18][16].textValue != ""
                          ? <p className="fontpage" style={{ marginTop: "5px" }}>UA  &emsp;{teststate[18][16].textValue} </p>
                          : <p className="fontpage">UA  .......................................................................................................................................</p>
                        }
                        {teststate[18][17].textValue != ""
                          ? <p className="fontpage" style={{ marginTop: "5px" }}>CXR  &emsp;{teststate[18][17].textValue} </p>
                          : <p className="fontpage">CXR  .....................................................................................................................................</p>
                        }
                        {teststate[18][18].textValue != ""
                          ? <p className="fontpage" style={{ marginTop: "5px" }}>[ABG/PFT]  &emsp;{teststate[18][18].textValue} </p>
                          : <p className="fontpage">[ABG/PFT]  ...........................................................................................................................</p>
                        }
                        {teststate[18][19].textValue != ""
                          ? <p className="fontpage" style={{ marginTop: "5px" }}>EKG  &emsp;{teststate[18][19].textValue} </p>
                          : <p className="fontpage">EKG  .....................................................................................................................................</p>
                        }
                        {teststate[18][20].textValue != ""
                          ? <p className="fontpage" style={{ marginTop: "5px" }}>Echo  &emsp;{teststate[18][20].textValue} </p>
                          : <p className="fontpage">Echo  .....................................................................................................................................</p>
                        }
                        {teststate[18][21].textValue != ""
                          ? <p className="fontpage" style={{ marginTop: "5px" }}>CAG  &emsp;{teststate[18][21].textValue} </p>
                          : <p className="fontpage">CAG  .....................................................................................................................................</p>
                        }
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Blood Preparation  </p></div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[19][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                PRC  {teststate[19][0].textValue} Unit
                              </div>
                              : <div id="squares"><div id="square1"></div>PRC...........Unit</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage">
                            {teststate[19][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                FFP  {teststate[19][1].textValue} Unit
                              </div>
                              : <div id="squares"><div id="square1"></div>FFP...........Unit</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage">
                            {teststate[19][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WB  {teststate[19][2].textValue} Unit
                              </div>
                              : <div id="squares"><div id="square1"></div>WB...........Unit</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">   </p></div>
                          <div className=" col-span-1 fontpage">
                            {teststate[19][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Plt  {teststate[19][3].textValue} Unit
                              </div>
                              : <div id="squares"><div id="square1"></div>Plt...........Unit</div>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "" }}>
                            {teststate[19][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                {teststate[19][4].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div>............................................................</div>
                            }
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className=" grid grid-cols-11  border border-black    " style={{}}>
                      <div className=" col-span-6 parafont border border-black  border-y-0 border-l-0 pl-1" style={{ lineHeight: "20px" }}>
                        <h3><b>PHYSICAL EXAMINATION :</b></h3>
                        <div className=" grid grid-cols-5 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Body built  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[13][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Thin</div>
                              : <div id="squares"><div id="square1"></div>Thin</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            {teststate[13][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Normal</div>
                              : <div id="squares"><div id="square1"></div>Normal</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }} >
                            {teststate[13][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Obesity</div>
                              : <div id="squares"><div id="square1"></div>Obesity</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            {teststate[13][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Morbid Obesity
                              </div>
                              : <div id="squares"><div id="square1"></div>Morbid Obesity</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            {teststate[13][4].textValue != ""
                              ? <p className=" fontpage">Weight {teststate[13][4].textValue} kg </p>
                              : <p className=" fontpage">Weight ........................ kg </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont">
                            {teststate[13][5].textValue != ""
                              ? <p className=" fontpage">Height {teststate[13][5].textValue} cm </p>
                              : <p className=" fontpage">Height ........................ cm </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont">
                            {teststate[13][6].textValue != ""
                              ? <p className=" fontpage">ฺBMI {teststate[13][6].textValue} kg/m2 </p>
                              : <p className=" fontpage">ฺBMI ........................ kg/m2 </p>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            {teststate[13][7].textValue != ""
                              ? <p className=" fontpage">BP {teststate[13][7].textValue} mmHg </p>
                              : <p className=" fontpage">BP............./.............mmHg </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont" style={{ marginLeft: "10px" }}>
                            {teststate[13][8].textValue != ""
                              ? <p className=" fontpage">P {teststate[13][8].textValue} bpm </p>
                              : <p className=" fontpage">P ........................ bpm </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont" style={{ marginLeft: "10px" }}>
                            {teststate[13][9].textValue != ""
                              ? <p className=" fontpage">RR {teststate[13][8].textValue} bpm </p>
                              : <p className=" fontpage">RR .................... bpm </p>
                            }
                          </div>
                          <div className=" col-span-1 parafont">
                            {teststate[13][10].textValue != ""
                              ? <p className=" fontpage">T {teststate[13][8].textValue} °C </p>
                              : <p className=" fontpage">T ............... °C </p>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Conscious  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[14][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Alert
                              </div>
                              : <div id="squares"><div id="square1"></div>Alert</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            {teststate[14][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Confusion
                              </div>
                              : <div id="squares"><div id="square1"></div>Confusion</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }} >
                            {teststate[14][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Drowsiness
                              </div>
                              : <div id="squares"><div id="square1"></div>Drowsiness</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            {teststate[14][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                COMA
                              </div>
                              : <div id="squares"><div id="square1"></div>COMA</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-30px" }}>

                            [GCS......../15]
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Airway  </p>
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            {teststate[14][4].codeValue === "Normal Airway"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Normal Airway
                              </div>
                              : <div id="squares"><div id="square1"></div>Normal Airway</div>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-10px" }}>
                            {teststate[14][4].codeValue != "Normal Airway"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Difficulty Intubation Expected
                              </div>
                              : <div id="squares"><div id="square1"></div>Difficulty Intubation Expected</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-2 gap-3 my-1" >
                          <div className=" col-span-1 parafont" style={{ paddingTop: "" }}>
                            {teststate[15][0].codeValue === "Y" ?
                              <p className="fontpage">- Mallampati Classification   &emsp;1  </p>
                              : teststate[15][1].codeValue === "Y" ? <p className="fontpage">- Mallampati Classification   &emsp;2</p>
                                : teststate[15][2].codeValue === "Y" ? <p className="fontpage">- Mallampati Classification   &emsp;3  </p>
                                  : teststate[15][3].codeValue === "Y" ? <p className="fontpage">- Mallampati Classification   &emsp;4 </p>
                                    : <p className="fontpage">- Mallampati Classification  &emsp; 1 &emsp;   2  &emsp; 3 &emsp;   4</p>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" style={{ paddingLeft: "37px" }}>
                            <img src={Mouth} className=" " alt="" style={{ width: "176px", height: "46px", marginTop: "-10px" }} />
                          </div>

                        </div>

                        <div className=" grid grid-cols-3 gap-3 my-1" style={{ marginTop: "-9px" }}>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">-  Thyromental Distance  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[16][0].codeValue === "<6"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                &lt; 6 cm
                              </div>
                              : <div id="squares"><div id="square1"></div> &lt; 6 cm</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[16][0].codeValue === ">6"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                &gt; 6 cm
                              </div>
                              : <div id="squares"><div id="square1"></div> &gt; 6 cm</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">-  Mouth Opening  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                &lt; 3 cm
                              </div>
                              : <div id="squares"><div id="square1"></div> &lt; 3 cm</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                &gt; 3 cm
                              </div>
                              : <div id="squares"><div id="square1"></div> &gt; 3 cm</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" style={{ marginLeft: "20px" }}>
                            {teststate[17][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Limitation of Head-Neck Motility
                              </div>
                              : <div id="squares"><div id="square1"></div> Limitation of Head-Neck Motility</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Prominent Incisor
                              </div>
                              : <div id="squares"><div id="square1"></div> Prominent Incisor</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Artificial airways
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][4].codeValue === "Endotracheal"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Endotracheal
                              </div>
                              : <div id="squares"><div id="square1"></div> Endotracheal</div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][4].codeValue != "Endotracheal"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Tracheostomy
                              </div>
                              : <div id="squares"><div id="square1"></div> Tracheostomy</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Dental
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][5].codeValue === "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>
                              : <div id="squares"><div id="square1"></div> WNL</div>
                            }
                          </div>
                          <div className=" col-span-4 fontpage" >
                            {teststate[17][5].codeValue != "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Abnormal &emsp;{teststate[17][5].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Abnormal &emsp;{teststate[17][5].textValue}</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            CVS
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][6].codeValue === "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>
                              : <div id="squares"><div id="square1"></div> WNL </div>
                            }
                          </div>
                          <div className=" col-span-4 fontpage" >
                            {teststate[17][6].codeValue != "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Abnormal &emsp;{teststate[17][6].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Abnormal &emsp;{teststate[17][6].textValue}</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            RS
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][7].codeValue === "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>
                              : <div id="squares"><div id="square1"></div> WNL </div>
                            }
                          </div>
                          <div className=" col-span-4 fontpage" >
                            {teststate[17][7].codeValue != "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Abnormal &emsp;{teststate[17][7].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Abnormal &emsp;{teststate[17][7].textValue}</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            CNS
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][8].codeValue === "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>
                              : <div id="squares"><div id="square1"></div> WNL </div>
                            }
                          </div>
                          <div className=" col-span-4 fontpage" >
                            {teststate[17][8].codeValue != "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Abnormal &emsp;{teststate[17][8].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Abnormal &emsp;{teststate[17][8].textValue}</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Abdomen
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][9].codeValue === "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>
                              : <div id="squares"><div id="square1"></div> WNL </div>
                            }
                          </div>
                          <div className=" col-span-4 fontpage" >
                            {teststate[17][9].codeValue != "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Abnormal &emsp;{teststate[17][9].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Abnormal &emsp;{teststate[17][9].textValue}</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Extremity
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][10].codeValue === "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>
                              : <div id="squares"><div id="square1"></div> WNL </div>
                            }
                          </div>
                          <div className=" col-span-4 fontpage" >
                            {teststate[17][10].codeValue != "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Abnormal &emsp;{teststate[17][10].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Abnormal &emsp;{teststate[17][10].textValue}</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Landmark for R.A.
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][11].codeValue === "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>
                              : <div id="squares"><div id="square1"></div> WNL </div>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" >
                            {teststate[17][11].codeValue != "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Abnormal &emsp;{teststate[17][11].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Abnormal &emsp;{teststate[17][11].textValue}</div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Landmark for IV
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[17][12].codeValue === "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                WNL
                              </div>
                              : <div id="squares"><div id="square1"></div> WNL </div>
                            }

                          </div>
                          <div className=" col-span-2 fontpage" >
                            {teststate[17][12].codeValue != "WNL"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Abnormal &emsp;{teststate[17][12].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Abnormal &emsp;{teststate[17][12].textValue}</div>
                            }
                          </div>
                        </div>
                        {teststate[17][12].textValue != ""
                          ?
                          <p className="fontpage">Note : &emsp;{teststate[17][13].textValue}</p>
                          :
                          <p className="fontpage">Note : ..................................................................................................................................................</p>
                        }
                      </div>
                      <div className=" col-span-5 parafont pl-1 lab" style={{ lineHeight: "20px" }}>
                        <h3><b>ASSESSMENT :</b></h3>
                        <div className=" grid grid-cols-2 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            {teststate[20][0].textValue != ""
                              ?
                              <p className="fontpage">NPO time &emsp;{teststate[20][0].textValue} &emsp;hours</p>
                              :
                              <p className=" fontpage">NPO time ............................ hours  </p>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[20][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Full stomach {teststate[20][1].textValue}
                              </div>
                              : <div id="squares"><div id="square1"></div> Full stomach [............................] </div>
                            }
                          </div>
                        </div>
                        {teststate[20][2].textValue != ""
                          ?
                          <p className="fontpage">Problem list &emsp;{teststate[20][2].textValue}</p>
                          :
                          <p className="fontpage">Problem list .........................................................................................................................</p>
                        }
                        <div className=" grid grid-cols-10 gap-3 my-1" >
                          <div className=" col-span-3 parafont">
                            <p className=" fontpage">ASA classification  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                1
                              </div>
                              : <div id="squares"><div id="square1"></div> 1 </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                2
                              </div>
                              : <div id="squares"><div id="square1"></div> 2 </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                3
                              </div>
                              : <div id="squares"><div id="square1"></div> 3 </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                4
                              </div>
                              : <div id="squares"><div id="square1"></div> 4 </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                5
                              </div>
                              : <div id="squares"><div id="square1"></div> 5 </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][5].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                6
                              </div>
                              : <div id="squares"><div id="square1"></div> 6 </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][6].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                E
                              </div>
                              : <div id="squares"><div id="square1"></div> E </div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-4 parafont fontpage" >
                            Discussion of anesthetic risk with patient/family
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][7].codeValue === "Yes"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Yes
                              </div>
                              : <div id="squares"><div id="square1"></div> Yes </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][7].codeValue != "Yes"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                No
                              </div>
                              : <div id="squares"><div id="square1"></div> No </div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-2 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            After discussion, patient/ family prefer
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][8].textValue != ""
                              ?
                              <p className=" fontpage">{teststate[21][8].textValue} </p>
                              : <p className=" fontpage">.......................................................</p>
                            }
                          </div>

                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                            Informed Consent
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][9].codeValue === "Yes"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Yes
                              </div>
                              : <div id="squares"><div id="square1"></div> Yes </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[21][9].codeValue != "Yes"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                No
                              </div>
                              : <div id="squares"><div id="square1"></div> No </div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                            Anesthetic Technique
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[22][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                L.A.
                              </div>
                              : <div id="squares"><div id="square1"></div> L.A. </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[22][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                MAC
                              </div>
                              : <div id="squares"><div id="square1"></div> MAC </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[22][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-8px", marginLeft: "-1px" }}>&#10004;</p></div>
                                G.A.
                              </div>
                              : <div id="squares"><div id="square1"></div> G.A. </div>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" >
                            {teststate[22][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-7px", marginLeft: "-1px" }}>&#10004;</p></div>
                                R.A:S.B/E.B/BB
                              </div>
                              : <div id="squares"><div id="square1"></div> R.A:S.B/E.B/BB </div>
                            }
                          </div>
                        </div>
                        {teststate[22][4].textValue != ""
                          ?
                          <p className=" fontpage">Preparation &emsp;{teststate[22][4].textValue} </p>
                          : <p className=" fontpage" style={{ width: '386px' }}>Preparation ......................................................................................................................... </p>
                        }
                        {teststate[22][5].textValue != ""
                          ?
                          <p className=" fontpage">Monitoring &emsp;{teststate[22][5].textValue} </p>
                          : <p className=" fontpage">Monitoring ........................................................................................................................... </p>
                        }
                        {teststate[22][6].textValue != ""
                          ?
                          <p className=" fontpage">Premedication &emsp;{teststate[22][6].textValue} </p>
                          : <p className=" fontpage">Premedication .................................................................................................................... </p>
                        }
                        {teststate[22][7].textValue != ""
                          ?
                          <p className=" fontpage">Consultations &emsp;{teststate[22][7].textValue} </p>
                          : <p className=" fontpage">Consultations ...................................................................................................................... </p>
                        }
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-3 parafont fontpage" >
                            Postoperative care need ICU
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[22][8].codeValue === "Yes"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-7px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Yes
                              </div>
                              : <div id="squares"><div id="square1"></div> Yes </div>
                            }
                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[22][8].codeValue != "Yes"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-7px", marginLeft: "-1px" }}>&#10004;</p></div>
                                No
                              </div>
                              : <div id="squares"><div id="square1"></div> No </div>
                            }
                          </div>
                        </div>
                        {teststate[22][8].codeValue === "Yes"
                          ?
                          <p className=" fontpage">{teststate[22][8].textValue} </p>
                          : <p className="fontpage">........................................................................................................................................</p>
                        }
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                            Postoperative Pain
                          </div>
                          <div className=" col-span-2 fontpage" >
                            {teststate[23][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-7px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Routine by Surgeon
                              </div>
                              : <div id="squares"><div id="square1"></div> Routine by Surgeon </div>
                            }

                          </div>
                          <div className=" col-span-1 fontpage" >
                            {teststate[23][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-7px", marginLeft: "-1px" }}>&#10004;</p></div>
                                PCA
                              </div>
                              : <div id="squares"><div id="square1"></div> PCA </div>
                            }
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                          </div>
                          <div className=" col-span-3 fontpage" >
                            {teststate[23][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-7px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Epidural / Spinal Opioids
                              </div>
                              : <div id="squares"><div id="square1"></div> Epidural / Spinal Opioids </div>
                            }
                          </div>
                        </div>
                        {teststate[23][3].textValue != ""
                          ?
                          <p className=" fontpage">Note : {teststate[23][3].textValue} <br /><br /><br /><br /></p>
                          : <div><p className="fontpage" style={{ marginTop: "15px" }}>Note : .................................................................................................................................</p>
                            <p className="fontpage" style={{ marginTop: "7px" }}>.........................................................................................................................................</p>
                            <p className="fontpage" style={{ marginTop: "7px" }}>........................................................................................................................................</p>
                          </div>
                        }

                        <div className=" grid grid-cols-5 gap-3 my-1" style={{ marginTop: "50px" }}>
                          <div className=" col-span-3 parafont fontpage" >
                            {teststate[23][4].textValue != ""
                              ?
                              <p className=" fontpage">Anesthesiologist Signature {teststate[23][4].textValue} </p>
                              : <p className="fontpage">Anesthesiologist Signature ........................................... </p>
                            }
                          </div>
                          <div className=" col-span-2 fontpage" >
                            {teststate[23][5].textValue != ""
                              ?
                              <p className=" fontpage">MD/Date {teststate[23][5].datetime.substring(6, 8)}/{teststate[23][5].datetime.substring(4, 6)}/{teststate[23][5].datetime.substring(0, 4)} &emsp; {teststate[23][5].datetime.substring(8, 10)}:{teststate[23][5].datetime.substring(10, 12)}</p>
                              : <p className="fontpage">MD/Date............................. </p>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" grid grid-cols-3 gap-3 my-1" style={{ marginTop: "" }} >
                    <div className=" col-span-1 " style={{ fontSize: "18px" }}>
                      <p className="">EMR:AOP53 </p>
                    </div>
                    <div className=" col-span-1 " style={{ fontSize: "18px", textAlign: "center" }}>

                      Page 1 of 2
                    </div>
                    <div className=" col-span-1 " style={{ fontSize: "18px", textAlign: "right" }}>
                      <p className="">FAOP 00053Rev06</p>
                    </div>
                  </div>
                </header>
              </tbody>
              <tbody>
                <header className="grid grid-cols-1 parafont" style={{ marginBottom: "10px" }}>
                  <div className="header-1 ">
                    <div className=" grid grid-cols-11  border border-black   border-b-0 " style={{}}>
                      <div className=" col-span-5 parafont border border-black  border-y-0 border-l-0 pl-1">
                        {teststate2[0][0].textValue != ""
                          ?
                          <p className="fontpage">Post Operation Evaluated by Doctor {teststate2[0][0].textValue}</p>
                          : <p className="fontpage">Post Operation Evaluated by Doctor ............................................................................ </p>
                        }
                      </div>
                      <div className=" col-span-6 parafont  pl-1 fontpage">
                        <div className=" grid grid-cols-2">
                          {teststate2[0][1].textValue != ""
                            ?
                            <div className="col-span-1">Date of Operation {teststate2[0][1].datetime.substring(6, 8)}/{teststate2[0][1].datetime.substring(4, 6)}/{teststate2[0][1].datetime.substring(0, 4)}&emsp; {teststate2[0][1].datetime.substring(8, 10)}:{teststate2[0][1].datetime.substring(10, 12)}</div>
                            : <div className="col-span-1">Date of Operation .................................................. </div>
                          }
                          {teststate2[0][2].textValue != ""
                            ?
                            <div className="col-span-1">Post Operation day {teststate2[0][2].textValue} </div>
                            : <div className="col-span-1">Post Operation day .......................................... </div>
                          }
                        </div>
                      </div>
                    </div>
                    <div className=" grid grid-cols-11  border border-black   border-b-0 " style={{}}>
                      <div className=" col-span-5 parafont border border-black  border-y-0 border-l-0 pl-1" >
                        <h3><b>Intraoperaive Management:</b></h3>
                        {teststate2[1][0].textValue != ""
                          ?
                          <p className="fontpage">Diagnosis {teststate2[1][0].textValue} </p>
                          : <p className="fontpage">Diagnosis ............................................................................................................................</p>
                        }
                        {teststate2[1][1].textValue != ""
                          ?
                          <p className="fontpage">Operation {teststate2[1][1].textValue} <br /> </p>
                          : <div>
                            <p className="fontpage">Operation ............................................................................................................................</p>
                            <p className="fontpage">............................................................................................................................................</p>
                          </div>
                        }
                        <div className=" grid grid-cols-2 fontpage" >
                          <div className="col-span=2">
                            {teststate2[1][2].textValue != ""
                              ?
                              <p>Anesthesiologist {teststate2[1][2].textValue} </p>
                              : <p>Anesthesiologist ..........................................</p>
                            }
                          </div>
                          <div className="col-span=2">
                            {teststate2[1][3].textValue != ""
                              ?
                              <p>Surgeon {teststate2[1][3].textValue} </p>
                              : <p>Surgeon .....................................................</p>
                            }
                          </div>
                        </div>
                        <p className="fontpage">Anesthetic thechnique:</p>
                        <div className="grid grid-cols-8 fontpage">
                          <div className="col-span-1">
                            {teststate2[2][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                L.A.
                              </div>
                              : <div id="squares"><div id="square1"></div> L.A. </div>
                            }
                          </div>
                          <div className="col-span-1">
                            {teststate2[2][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                MAC
                              </div>
                              : <div id="squares"><div id="square1"></div> MAC </div>
                            }
                          </div>
                          <div className="col-span-3">
                            {teststate2[2][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                G.A. :ET-tube/Mask/.........
                              </div>
                              : <div id="squares"><div id="square1"></div> G.A. :ET-tube/Mask/.........</div>
                            }
                          </div>
                          <div className="col-span-3">
                            {teststate2[2][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                R.A.:S.B/E.B./BB/...............
                              </div>
                              : <div id="squares"><div id="square1"></div> R.A.:S.B/E.B./BB/...............</div>
                            }
                          </div>
                        </div>
                        <p className="fontpage">Positioning:</p>
                        <div className="grid grid-cols-6 fontpage">
                          <div className="col-span-1">
                            {teststate2[3][0].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Supine
                              </div>
                              : <div id="squares"><div id="square1"></div> Supine</div>
                            }
                          </div>
                          <div className="col-span-1">
                            {teststate2[3][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Lithotomy
                              </div>
                              : <div id="squares"><div id="square1"></div> Lithotomy</div>
                            }
                          </div>
                          <div className="col-span-1">
                            {teststate2[3][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Prone
                              </div>
                              : <div id="squares"><div id="square1"></div> Prone</div>
                            }
                          </div>
                          <div className="col-span-1">
                            {teststate2[3][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Lateral
                              </div>
                              : <div id="squares"><div id="square1"></div> Lateral</div>
                            }
                          </div>
                          <div className="col-span-2">
                            {teststate2[3][4].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Other ............................
                              </div>
                              : <div id="squares"><div id="square1"></div> Other ............................</div>
                            }
                          </div>
                        </div>
                        <div className="grid grid-cols-4 fontpage">
                          <div className="col-span-2">
                            Intraoperaive untoward events:
                          </div>
                          <div className="col-span-1">
                            {teststate2[4][0].codeValue != "YES"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                No
                              </div>
                              : <div id="squares"><div id="square1"></div> No </div>
                            }
                          </div>
                          <div className="col-span-1">
                            {teststate2[4][0].codeValue === "YES"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Yes
                              </div>
                              : <div id="squares"><div id="square1"></div> Yes </div>
                            }
                          </div>
                        </div>
                        <div className="fontpage">
                          {teststate2[4][1].codeValue == "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Airway &emsp;{teststate2[4][1].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Airway......................................................................................................................... </div>
                          }
                        </div>
                        <div className="fontpage">
                          {teststate2[4][2].codeValue == "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Respiratory &emsp;{teststate2[4][2].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Respiratory................................................................................................................ </div>
                          }
                        </div>
                        <div className="fontpage">
                          {teststate2[4][3].codeValue == "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              CVS &emsp;{teststate2[4][3].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> CVS............................................................................................................................... </div>
                          }
                        </div>
                        <div className="fontpage">
                          {teststate2[4][4].codeValue == "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              CNS &emsp;{teststate2[4][4].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> CNS............................................................................................................................. </div>
                          }
                        </div>
                        <div className="fontpage">
                          {teststate2[4][5].codeValue == "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Block &emsp;{teststate2[4][5].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Block............................................................................................................................. </div>
                          }
                        </div>
                        <div className="fontpage">
                          {teststate2[4][6].codeValue == "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Pain &emsp;{teststate2[4][6].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Pain............................................................................................................................. </div>
                          }
                        </div>
                        <div className="fontpage">
                          {teststate2[4][7].codeValue == "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Miscellaneous &emsp;{teststate2[4][7].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Miscellaneous............................................................................................................... </div>
                          }
                        </div>
                      </div>
                      <div className=" col-span-6 parafont border border-black  border-r-0 border-t-0 border-l-0 pl-1" >
                        <div className=" col-span-5 parafont" >
                          <h3><b>Postoperative Complications:</b></h3>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              1.HEENT :
                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][0].codeValue === "NO"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  No
                                </div>
                                : <div id="squares"><div id="square1"></div> No </div>
                              }
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              {teststate2[9][0].codeValue === "YES"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Yes
                                </div>
                                : <div id="squares"><div id="square1"></div> Yes </div>
                              }
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][1].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Lip Trauma
                                </div>
                                : <div id="squares"><div id="square1"></div> Lip Trauma </div>
                              }
                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][2].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Dental Trauma
                                </div>
                                : <div id="squares"><div id="square1"></div> Dental Trauma </div>
                              }

                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][3].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Sore Throat
                                </div>
                                : <div id="squares"><div id="square1"></div> Sor Throat </div>
                              }

                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][4].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Hoarseness
                                </div>
                                : <div id="squares"><div id="square1"></div> Hoarseness </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][5].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Corneal Abrasion
                                </div>
                                : <div id="squares"><div id="square1"></div> Corneal Abrasion </div>
                              }

                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][6].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Eye Injury
                                </div>
                                : <div id="squares"><div id="square1"></div> Eye Injury </div>
                              }

                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][7].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Ear Injury
                                </div>
                                : <div id="squares"><div id="square1"></div> Ear Injury </div>
                              }
                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[9][8].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Nose Injury
                                </div>
                                : <div id="squares"><div id="square1"></div> Nose Injury </div>
                              }
                            </div>
                          </div>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              1.Respiratory :
                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[10][0].codeValue === "NO"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  No
                                </div>
                                : <div id="squares"><div id="square1"></div> No </div>
                              }
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              {teststate2[10][0].codeValue === "YES"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Yes
                                </div>
                                : <div id="squares"><div id="square1"></div> Yes </div>
                              }
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              {teststate2[10][1].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Hypoxemia
                                </div>
                                : <div id="squares"><div id="square1"></div>Hypoxemia </div>
                              }
                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[10][2].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Hypoventilation
                                </div>
                                : <div id="squares"><div id="square1"></div>Hypoventilation </div>
                              }

                            </div>
                            <div className="col-span-2 fontpage" style={{ marginLeft: "30px" }}>
                              {teststate2[10][3].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Hyperventilation
                                </div>
                                : <div id="squares"><div id="square1"></div>Hyperventilation </div>
                              }
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              {teststate2[10][4].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Aspiration
                                </div>
                                : <div id="squares"><div id="square1"></div>Aspiration </div>
                              }

                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[10][5].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Pneumothorax
                                </div>
                                : <div id="squares"><div id="square1"></div>Pneumothorax </div>
                              }

                            </div>
                            <div className="col-span-2 fontpage" style={{ marginLeft: "30px" }}>
                              {teststate2[10][6].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Reintubation
                                </div>
                                : <div id="squares"><div id="square1"></div>Reintubation </div>
                              }
                            </div>
                          </div>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              3.CVS :
                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[11][0].codeValue === "NO"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  No
                                </div>
                                : <div id="squares"><div id="square1"></div> No </div>
                              }
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              {teststate2[11][0].codeValue === "YES"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Yes
                                </div>
                                : <div id="squares"><div id="square1"></div> Yes </div>
                              }
                            </div>
                          </div>
                          <div className="grid grid-cols-5" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              {teststate2[11][1].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Bradycardia
                                </div>
                                : <div id="squares"><div id="square1"></div>Bradycardia </div>
                              }

                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[11][2].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Tachycardia
                                </div>
                                : <div id="squares"><div id="square1"></div>Tachycardia </div>
                              }

                            </div>
                            <div className="col-span-1 fontpage" >
                              {teststate2[11][3].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Dysrhythmia
                                </div>
                                : <div id="squares"><div id="square1"></div>Dysrhythmia </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-5" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              {teststate2[11][4].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Hypotension [&lt;30%Pre-op SBP]
                                </div>
                                : <div id="squares"><div id="square1"></div>Hypotension [&lt;30%Pre-op SBP] </div>
                              }

                            </div>
                            <div className="col-span-3 fontpage">
                              {teststate2[11][5].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Hypertension [&gt;30%Pre-op SBP]
                                </div>
                                : <div id="squares"><div id="square1"></div>Hypertension [&gt;30%Pre-op SBP] </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-5" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              {teststate2[11][6].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Chest Pain/MI suspected
                                </div>
                                : <div id="squares"><div id="square1"></div>Chest Pain/MI suspected </div>
                              }

                            </div>
                            <div className="col-span-3 fontpage">
                              {teststate2[11][7].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Myocardial Ischemia
                                </div>
                                : <div id="squares"><div id="square1"></div>Myocardial Ischemia </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-5" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              {teststate2[11][8].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Pulmonary Edema/CHF
                                </div>
                                : <div id="squares"><div id="square1"></div>Pulmonary Edema/CHF </div>
                              }

                            </div>
                            <div className="col-span-3 fontpage">
                              {teststate2[11][9].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Cardiac Arrest
                                </div>
                                : <div id="squares"><div id="square1"></div>Cardiac Arrest </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              4.CNS :
                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[12][0].codeValue === "NO"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  No
                                </div>
                                : <div id="squares"><div id="square1"></div> No </div>
                              }
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              {teststate2[12][0].codeValue === "YES"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Yes
                                </div>
                                : <div id="squares"><div id="square1"></div> Yes </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              {teststate2[12][1].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Awareness
                                </div>
                                : <div id="squares"><div id="square1"></div>Awareness </div>
                              }

                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[12][2].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Headache
                                </div>
                                : <div id="squares"><div id="square1"></div>Headache</div>
                              }

                            </div>
                            <div className="col-span-2 fontpage" style={{ marginLeft: "30px" }}>
                              {teststate2[12][3].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Drowsy/Anxiety
                                </div>
                                : <div id="squares"><div id="square1"></div>Drowsy/Anxiety </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              {teststate2[12][4].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Convulsion
                                </div>
                                : <div id="squares"><div id="square1"></div>Convulsion </div>
                              }

                            </div>
                            <div className="col-span-3 fontpage">
                              {teststate2[12][5].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Peripheral Nerve Injury from positioning &emsp;
                                  {teststate2[12][1].textValue ? teststate2[12][1].textValue : ''}
                                  {teststate2[12][2].textValue ? teststate2[12][2].textValue : ''}
                                  {teststate2[12][3].textValue ? teststate2[12][3].textValue : ''}
                                  {teststate2[12][4].textValue ? teststate2[12][4].textValue : ''}
                                  {teststate2[12][5].textValue ? teststate2[12][5].textValue : ''}
                                </div>
                                : <div id="squares"><div id="square1"></div>Peripheral Nerve Injury from positioning ................................................ </div>
                              }
                            </div>
                          </div>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              5.Others :
                            </div>
                            <div className="col-span-1 fontpage">
                              {teststate2[13][0].codeValue != "YES Treatment"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  No
                                </div>
                                : <div id="squares"><div id="square1"></div> No </div>
                              }
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              {teststate2[13][0].codeValue === "YES Treatment"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Yes
                                </div>
                                : <div id="squares"><div id="square1"></div> Yes </div>
                              }
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              {teststate2[13][1].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Hypothemia [BT&lt;35C]/Shivering
                                </div>
                                : <div id="squares"><div id="square1"></div>Hypothemia [BT&lt;35C]/Shivering </div>
                              }

                            </div>
                            <div className="col-span-2 fontpage">
                              {teststate2[13][2].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Hypothemia [BT&gt;38C]/Burn
                                </div>
                                : <div id="squares"><div id="square1"></div>Hypothemia [BT&gt;38C]/Burn </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              {teststate2[13][3].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Drugs Intoxicity / Allergic reaction
                                </div>
                                : <div id="squares"><div id="square1"></div>Drugs Intoxicity / Allergic reaction </div>
                              }

                            </div>
                            <div className="col-span-2 fontpage">
                              {teststate2[13][4].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Delayed Emergence
                                </div>
                                : <div id="squares"><div id="square1"></div>Delayed Emergence </div>
                              }

                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              {teststate2[13][5].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Muscular discomfort / Back pain
                                </div>
                                : <div id="squares"><div id="square1"></div>Muscular discomfort / Back pain </div>
                              }

                            </div>
                            <div className="col-span-2 fontpage">
                              {teststate2[13][6].codeValue === "Y"
                                ?
                                <div id="squares">
                                  <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                  Dead on table / Death within 48 hours
                                </div>
                                : <div id="squares"><div id="square1"></div>Dead on table / Death within 48 hours </div>
                              }

                            </div>
                          </div>
                          {teststate2[13][1].textValue != "" ?
                            <p className="fontpage">{teststate2[13][1].textValue}</p>
                            : teststate2[13][2].textValue != "" ?
                              <p className="fontpage">{teststate2[13][2].textValue}</p>
                              : teststate2[13][3].textValue != "" ?
                                <p className="fontpage">{teststate2[13][3].textValue}</p>
                                : teststate2[13][4].textValue != "" ?
                                  <p className="fontpage">{teststate2[13][4].textValue}</p>
                                  : teststate2[13][5].textValue != "" ?
                                    <p className="fontpage">{teststate2[13][5].textValue}</p>
                                    : teststate2[13][6].textValue != "" ?
                                      <p className="fontpage">{teststate2[13][6].textValue}</p>
                                      : <p className="fontpage"> ........................................................................................................................................................................</p>
                          }

                        </div>
                      </div>
                    </div>
                    <div className=" grid grid-cols-11  border border-black    border-t-0  border-r-0  " >
                      <div className=" col-span-5 parafont border border-black  border-r-1 border-l-0 pl-1" style={{ marginTop: "-90px", paddingLeft: "8px" }}>
                        <h3><b>Postoperative Pain controlled by:</b></h3>
                        <div className="fontpage">
                          {teststate2[5][0].codeValue === "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Routine order by surgeon
                            </div>
                            : <div id="squares"><div id="square1"></div> Routine order by surgeon </div>
                          }
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="col-span-1 fontpage">
                            {teststate2[5][1].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Acute Pain Service :
                              </div>
                              : <div id="squares"><div id="square1"></div> Acute Pain Service </div>
                            }
                          </div>
                          <div className="col-span-1 fontpage">
                            {teststate2[5][2].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Epidural/Spinal Opioids :
                              </div>
                              : <div id="squares"><div id="square1"></div> Epidural/Spinal Opioids </div>
                            }
                          </div>
                          <div className="col-span-1 fontpage" style={{ marginLeft: "20px" }}>
                            {teststate2[5][3].codeValue === "Y"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                PCA
                              </div>
                              : <div id="squares"><div id="square1"></div> PCA </div>
                            }
                          </div>
                        </div>
                        <div className="fontpage">
                          {teststate2[5][4].codeValue === "Y"
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Other ........................................................................................................................
                            </div>
                            : <div id="squares"><div id="square1"></div> Other ........................................................................................................................ </div>
                          }
                        </div>
                        <div className="grid grid-cols-5 ">
                          <div className="col-span-1">
                            <h3><b>Pain score:</b>  </h3>
                          </div>
                          <div className="col-span-4 fontpage">
                            Verbal Numerical Rating Scale [VNRS]
                          </div>
                        </div>
                        <div className="grid grid-cols-4 ">
                          <div className="col-span-2 fontpage">
                            {teststate2[6][0].textValue != ""
                              ?
                              <div>[0=No Pain {teststate2[6][0].textValue} 10=Worst Pain]</div>
                              : <div> [0=No Pain .............. 10=Worst Pain] </div>
                            }
                          </div>
                          <div className="col-span-1 fontpage">
                            {teststate2[6][1].textValue != ""
                              ?
                              <div>Rest {teststate2[6][1].textValue}</div>
                              : <div> Rest .................. </div>
                            }
                          </div>
                          <div className="col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            {teststate2[6][2].textValue != ""
                              ?
                              <div>Activity {teststate2[6][2].textValue}</div>
                              : <div> Activity ...................... </div>
                            }
                          </div>
                        </div>
                        <div className="grid grid-cols-5 ">
                          <div className="col-span-2">
                            <h3><b>Sedation Score:</b>  </h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-7">
                          <div className="col-span-4 fontpage">
                            [0=Awake 1=Drowsy 2=Asleep 3=Deep Sleep]
                          </div>
                          <div className="col-span-1 fontpage">
                            {teststate2[7][0].textValue != ""
                              ?
                              <div> {teststate2[7][0].textValue}</div>
                              : <div> ...................................................... </div>
                            }
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-2 fontpage">
                            Side Effects of Opioids
                          </div>
                          <div className="col-span-1 fontpage">
                            {teststate2[7][1].codeValue != "YES"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                No
                              </div>
                              : <div id="squares"><div id="square1"></div> No </div>
                            }
                          </div>
                          <div className="col-span-1 fontpage">
                            {teststate2[7][1].codeValue == "YES"
                              ?
                              <div id="squares">
                                <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                                Yes
                              </div>
                              : <div id="squares"><div id="square1"></div> Yes </div>
                            }
                          </div>
                          <div className="col-span-2 fontpage">
                            Treatment
                          </div>
                        </div>
                        <div className="fontpage">
                          {(teststate2[7][2].textValue != "") || (teststate2[7][2].codeValue === "Y")
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Respiratory Depression {teststate2[7][2].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Respiratory Depression ............................................................................................ </div>
                          }
                        </div>
                        <div className="fontpage">
                          {(teststate2[7][3].textValue != "") || (teststate2[7][3].codeValue === "Y")
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Nausea/Vomiting {teststate2[7][3].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Nausea/Vomiting ...................................................................................................... </div>
                          }
                        </div>
                        <div className="fontpage">
                          {(teststate2[7][4].textValue != "") || (teststate2[7][4].codeValue === "Y")
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Pruritus {teststate2[7][4].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Pruritus .................................................................................................................... </div>
                          }
                        </div>
                        <div className="fontpage">
                          {(teststate2[7][5].textValue != "") || (teststate2[7][5].codeValue === "Y")
                            ?
                            <div id="squares">
                              <div id="square1"><p style={{ fontSize: "18px", marginTop: "-11px", marginLeft: "-1px" }}>&#10004;</p></div>
                              Urinary retention {teststate2[7][5].textValue}
                            </div>
                            : <div id="squares"><div id="square1"></div> Urinary retention ....................................................................................................... </div>
                          }
                        </div>
                        <div className="fontpage">
                          {teststate2[7][6].textValue != ""
                            ?
                            <p>Plan for post operative pain if inadequate: {teststate2[7][6].textValue}<br /><br /></p>
                            : <div> Plan for post operative pain if inadequate: ...................................................................                         <div className="fontpage">.........................................................................................................................................</div>
                            </div>
                          }
                        </div>
                      </div>
                      <div className=" col-span-6 parafont border border-black  border-t-0 border-l-0" style={{ paddingTop: "10px" }}>
                        <div style={{ paddingLeft: "5px" }}>
                          <b>Impression:</b> ..................................................................................................
                        </div>
                        <div className="fontpage  border border-black border-t-0 border-l-0 border-r-0 " style={{ paddingLeft: "5px" }}>
                          {teststate2[14][0].textValue != ""
                            ?
                            <p>Anesthetic Plan: {teststate2[14][0].textValue}<br /></p>
                            : <div> Anesthetic Plan: .............................................................................................................................................
                              <div className="fontpage">........................................................................................................................................................................</div>
                            </div>
                          }
                        </div>
                      </div>
                      <div className=" col-span-5 parafont " style={{ paddingLeft: "5px" }}>
                      </div>
                      <div className=" col-span-6 parafont" style={{ paddingTop: "10px", marginTop: "-285px" }}>
                        <div className="fontpage  border border-black border-t-0 border-l-0 border-r-0 " style={{ marginTop: "20px", paddingLeft: "5px" }}>
                          {teststate2[14][1].textValue != ""
                            ?
                            <p>Progress note: {teststate2[14][1].textValue}<br /></p>
                            : <div>Progress note: .............................................................................................................................................
                              <div className="fontpage">........................................................................................................................................................................</div>
                            </div>
                          }
                        </div>
                      </div>
                      <div className=" col-span-5 parafont" >

                      </div>
                      <div className=" col-span-6 parafont " style={{ paddingTop: "10px", marginTop: "-220px" }}>

                        <div className="fontpage  border border-black border-t-0 border-l-0 border-r-0 " style={{ marginTop: "20px", paddingLeft: "5px" }}>
                          {teststate2[14][2].textValue != ""
                            ?
                            <p>Progress note: {teststate2[14][2].textValue}<br /></p>
                            : <div>Progress note: .............................................................................................................................................
                              <div className="fontpage">........................................................................................................................................................................</div>
                            </div>
                          }
                        </div>
                      </div>
                      <div className=" col-span-5 parafont pl-1" >

                      </div>
                      <div className=" col-span-6 parafont " style={{ paddingTop: "25px", marginTop: "-160px" }}>

                        <div className="fontpage" style={{ marginTop: "20px", paddingLeft: "5px" }}>
                          {teststate2[14][3].textValue != ""
                            ?
                            <p>Patient Comment: {teststate2[14][3].textValue}<br /></p>
                            : <div>Patient Comment: .............................................................................................................................................
                              <div className="fontpage">..........................................................................................................................................................................</div>
                            </div>
                          }
                        </div>
                        <div className="grid grid-cols-5 fontpage" style={{ marginTop: "10px", paddingLeft: "5px" }}>
                          {teststate2[14][4].textValue != ""
                            ?
                            <div className="col-span-3">Anesthesiologist Signature&nbsp; {teststate2[14][4].textValue}</div>
                            : <div className="col-span-3">Anesthesiologist Signature...........................................................</div>
                          }
                          {teststate2[14][5].textValue != ""
                            ?
                            <div className="col-span-2">MD/Date&nbsp; {teststate2[14][5].datetime.substring(6, 8)}/{teststate2[14][5].datetime.substring(4, 6)}/{teststate2[14][5].datetime.substring(0, 4)} &emsp; {teststate2[14][5].datetime.substring(8, 10)}:{teststate2[14][5].datetime.substring(10, 12)}</div>
                            : <div className="col-span-1">MD/Date...................................................</div>
                          }
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className=" grid grid-cols-3 gap-3 my-1" style={{ marginTop: "18px" }} >
                    <div className=" col-span-1 " style={{ fontSize: "18px" }}>
                      <p className="">EMR:AOP53 </p>
                    </div>
                    <div className=" col-span-1 " style={{ fontSize: "18px", textAlign: "center" }}>

                      Page 2 of 2
                    </div>
                    <div className=" col-span-1 " style={{ fontSize: "18px", textAlign: "right" }}>
                      <p className="">FAOP 00053Rev06</p>
                    </div>
                  </div>
                </header>
              </tbody>
            </page>
          </div>
        </div>
        : <div className="justify-center flex mt-96 content-center ">
          <ReactLoading
            type={"spin"}
            color={"#3c4187"}
            height={100}
            width={100}
          />
        </div>
      }

    </>
  );
}

export default Report;