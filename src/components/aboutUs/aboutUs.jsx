import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./aboutUs.module.css"
import React, { Fragment, useEffect, useState } from "react";

function AboutUs() {
  return (
    <div
      style={{
        backgroundColor: "#EAE151",
      }}
    >
        {/* //className={styles["navContainer"]} */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            <div className="p-2 d-flex align-items-center justify-content-around">
              <h1 className="section-head-title">Developed By ...</h1>
            </div>
            <div className={"row " + styles["stories"]}>
            <div
                className={" m-2 col-sm-6 col-md-3 " + styles["story1"]}
                style={{height: "35rem",width: "19rem"  , backgroundColor: "#FAFDF6" }}
              >
                <img
                  src="/assets/Ha.jpg"
                  alt=""
                  style={{marginLeft: "1px", marginTop: "5px"}}
                  height="60%"
                  className={" rounded-2 " + styles["story-img"]}
                />
                <br />
                <br />
                <h4 className="story-title">Hayah Hazem </h4>
                <a
                  href="https://www.facebook.com/hayah.hazem?mibextid=ZbWKwL"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-facebook"></i> Facebook
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/hayah-hazem"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-linkedin"></i> Linkedin
                </a>
                <br />
                <a
                  href="https://github.com/hayah1999"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
                <br />
              </div>
              


              <div
                className={"m-2 col-sm-6 col-md-3 " + styles["story2"]}
                style={{height: "35rem",width: "19rem" , backgroundColor: "#FAFDF6"}}
              >
                <img
                  src="/assets/Mu.jpg"
                  alt=""
                  style={{marginLeft: "1px", marginTop: "5px"}}
                  height="60%"
                  className={" rounded-2 " + styles["story-img "]}
                />
                <br />
                <br />
                <h4 className="story-title">Muhannad Ibrahim</h4>
                <a
                  href="https://www.facebook.com/muhannad.ibrahim.23"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-facebook"></i> Facebook
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/muhannad-ibrahim/"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-linkedin"></i> Linkedin
                </a>
                <br />
                <a
                  href="https://github.com/muhannad-ibrahim"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
                <br />
              </div>


              <div
                className={" m-2 col-sm-6 col-md-3 " + styles["story1"]}
                style={{height: "35rem",width: "19rem" , backgroundColor: "#FAFDF6" }}
              >
                <img
                  src="/assets/Om.jpeg"
                  alt=""
                  style={{marginLeft: "1px", marginTop: "5px"}}
                  height="60%"
                  className={" rounded-2 " + styles["story-img"]}
                />
                <br />
                <br />
                <h4 className="story-title">Omar Medhat </h4>
                <a
                  href="https://www.facebook.com/Omar3ain/"
                  target="_blank"
                  className={"facebook "+ styles["link"]}
                >
                  <i className="fa-brands fa-facebook"></i> Facebook
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/omar3ain/"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-linkedin"></i> Linkedin
                </a>
                <br />
                <a
                  href="https://github.com/Omar3ain"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
                <br />
              </div>


              <div
                className={"m-2 col-sm-6 col-md-3 " + styles["story2"]}
                style={{height: "35rem",width: "19rem" , backgroundColor: "#FAFDF6"}}
              >
                <img
                  src="/assets/So.jpeg"
                  alt=""
                  style={{marginLeft: "1px", marginTop: "5px"}}
                  height="60%"
                  className={" rounded-2 " + styles["story-img "]}
                />
                <br />
                <br />
                <h4 className="story-title">Somaya Ahmed</h4>
                <a
                  href="https://www.facebook.com/somaya.ahmed.33?mibextid=LQQJ4d"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-facebook"></i> Facebook
                </a>
                <br />
                <a
                  href="http://linkedin.com/in/somaya-ahmed"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-linkedin"></i> Linkedin
                </a>
                <br />
                <a
                  href="https://github.com/somayaax"
                  target="_blank"
                  className={"linkedin " + styles["link"]}
                >
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
