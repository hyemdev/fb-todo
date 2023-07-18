import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FooterAbout,
  FooterContent,
  FooterHover,
  FooterHoverDiv,
  FooterText,
  FooterWrap,
  ProfileBack,
  ProfileFront,
} from "../style/FooterCSS";
import { faCopyright, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import {
  faHandPointer,
  faHippo,
  faMusic,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useState } from "react";

const Footer = () => {
  const [showHoverDiv, setShowHoverDiv] = useState(false);

  const handleFooterAboutClick = () => {
    setShowHoverDiv(!showHoverDiv);
  };

  return (
    <FooterWrap>
      <FooterContent>
        <FooterHoverDiv style={{ display: showHoverDiv ? "block" : "none" }}>
          <FooterHover>
            <h2>만든 사람들 :) </h2>
            <ProfileBack>
              <span className="text-lg font-semibold">Back-End</span>
              <p>
                <FontAwesomeIcon
                  icon={faMusic}
                  className="text-lg font-extrabold text-amber-500"
                />{" "}
                하민수
                <Link to="https://github.com/HAMINSU123" target="_blank">
                  <FontAwesomeIcon icon={faGithub} className="ml-2" /> GitHub
                </Link>
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faMusic}
                  className="text-lg font-extrabold text-amber-500"
                />{" "}
                정우진
                <Link to="https://github.com/JungWooojin" target="_blank">
                  <FontAwesomeIcon icon={faGithub} className="ml-2" /> GitHub
                </Link>
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faMusic}
                  className="text-lg font-extrabold text-amber-500"
                />{" "}
                남규진
                <Link to="https://github.com/Minami0717" target="_blank">
                  <FontAwesomeIcon icon={faGithub} className="ml-2" /> GitHub
                </Link>
              </p>
            </ProfileBack>
            <ProfileFront>
              <span className="text-lg font-semibold">Front-End</span>
              <p>
                <FontAwesomeIcon
                  icon={faMusic}
                  className="text-lg font-extrabold text-amber-500"
                />{" "}
                최혜미{" "}
                <Link to="https://github.com/hyemdev" target="_blank">
                  <FontAwesomeIcon icon={faGithub} className="ml-2" /> GitHub
                </Link>
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faMusic}
                  className="text-lg font-extrabold text-amber-500"
                />{" "}
                유병준
              </p>
            </ProfileFront>
          </FooterHover>
        </FooterHoverDiv>
        <FooterAbout onClick={handleFooterAboutClick}>
          [ <FontAwesomeIcon icon={faUsers} /> 만든 사람들 ]{" "}
          <FontAwesomeIcon icon={faHandPointer} />{" "}
        </FooterAbout>
        <FooterText>
          <FontAwesomeIcon icon={faCopyright} /> 2023 Team-A+. All rights
          reserved.{" "}
        </FooterText>{" "}
      </FooterContent>
    </FooterWrap>
  );
};
export default Footer;
