import React, { useState } from "react";
import "./Resume.css";
import ScreenHeading from "../../Utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../Utilities/ScrollService";
import Animations from "../../Utilities/Animations";

export default function Resume(props) {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeScreen !== props.id) return;

    Animations.animations.fadeInScreen(props.id);
  };

  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  /* REUSABLE MINOR COMPONENTS */
  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
            <span>{props.heading ? props.heading : ""}</span>
            {props.fromDate && props.toDate ? (
              <div className="heading-date">
                {props.fromDate + "-" + props.toDate}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="resume-sub-heading">
            <span>{props.subHeading ? props.subHeading : ""}</span>
          </div>
          <div className="resume-heading-description">
            <span>{props.description ? props.description : ""}</span>
          </div>
        </div>
      
    );
  };

  /* STATIC RESUME DATA FOR THE LABELS*/
  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
    { label: "Interests", logoSrc: "interests.svg" },
  ];

  const programmingSkillDetails = [
    { skill: "JavaScript", ratingPercentage: 80 },
    { skill: "React JS", ratingPercentage: 60 },
    { skill: "React Native", ratingPercentage: 85 },
    // {skill: "Express JS", ratingPercentage:85},
    // {skill: "Node JS", ratingPercentage:85},
    // {skill: "Mongo DB", ratingPercentage:85},
    // {skill: "JCore Java", ratingPercentage:85},
    { skill: "HTML", ratingPercentage: 85 },
    { skill: "CSS", ratingPercentage: 85 },
    { skill: "PHP", ratingPercentage: 50 },
    { skill: "MySQL", ratingPercentage: 85 },
  ];

  const projectDetails = [
    {
      title: "Personal portfolio Website",
      duration: { fromDate: "2023", toDate: "2023" },
      description:
        "A personal Portfolio website to showcase all my details and project at one place",
      subHeading: "Technologies Used: React JS, Bootstrap",
    },
    {
      title: "Chat Application",
      duration: { fromDate: "2022", toDate: "2022" },
      description: "A Real Time Chat Application",
      subHeading: "Technologies Used: React Native, PHP, MySQL",
    },
    {
      title: "E-Commerce Front-End",
      duration: { fromDate: "2022", toDate: "2022" },
      description:
        "Front-End part of E-commerce sites with Admin Dashboard including login, Sign Up",
      subHeading: "Technologies Used: HTML, CSS, JavaScript, Bootstrap",
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"University of Birmingham City University"}
        subHeading={"Full Stack Software Engineering"}
        fromDate={"2022"}
        toDate={"2026"}
      />

      <ResumeHeading
        heading={"Sri Lanka Institute Of Textile and Apparel"}
        subHeading={"Advance Diploma in Industrial Engineering"}
        fromDate={"2014"}
        toDate={"2016"}
      />
      <ResumeHeading
        heading={"High School"}
        subHeading={"Karawita Central Colleague"}
        fromDate={"2004"}
        toDate={"2011"}
      />
    </div>,

    /* WORK EXPERIENCE */
    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading={"Athena Extreme Solution"}
          subHeading={"Full Stack Software Engineer"}
          fromDate={"2022"}
          toDate={"Present"}
        />
        <div className="experience-description">
          <span className="resume-description-text">
            Currently working as MERN stack web and mobile developer
          </span>
        </div>
        <div className="experience-description">
          <span className="resume-description-text">
            - Developed an E-commerce website Front-End with Dashboard for
            managing the products, users, invoices, reviews
          </span>
          <br />

          <span className="resume-description-text">
            - Integrated the web app with backend services to create new user
            onboarding application with dynamic form content
          </span>
          <br />
          <span className="resume-description-text">
            - I stretch my mental capacity to develope UI as per the given
            designs.
          </span>
        </div>
      </div>
    </div>,

    /* PROGRAMMING SKILLS */
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,

    /* PROJECTS */
    <div className="resume-screen-container" key="projects">
      {projectDetails.map((projectDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectDetails.title}
          subHeading={projectDetails.subHeading}
          description={projectDetails.description}
          fromDate={projectDetails.duration.fromDate}
          toDate={projectDetails.duration.toDate}
        />
      ))}
    </div>,

    /* Interests */
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Gaming"
        description="I like to challenge my reflexes a lot while competing in RPG games, Adventure games, Rasing games"
      />
      <ResumeHeading heading="Music" description="I like to listening songs" />
      <ResumeHeading
        heading="Sports"
        description="I like to play cricket, volley ball, swimming"
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;
    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };
    setCarousalOffSetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
         className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`)}
          alt="oops,,, no internet connection"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreen = () => {
    return (
      <div
        style={carousalOffSetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((resumeDetail) => resumeDetail)}
      </div>
    );
  };

  return (
    <div
      className="resume-container screen-container"
      id={props.id || ""}
    >
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My Formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>
          <div className="resume-bullet-details">{getResumeScreen()}</div>
        </div>
      </div>
    </div>
  );
}
