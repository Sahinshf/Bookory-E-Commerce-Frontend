import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Title = (props) => {
  return (
    <div className="bg-[#f0f0f0] py-20">
      <div className="container flex items-center justify-between">
        <h3 className="text-[5rem] font-semibold minw-sm:text-[6.4rem]">
          {props.title}
        </h3>
        <nav>
          <ul className="flex items-center text-lg text-[#999999]">
            <li>
              <Link className="text-[#999999]" to={"/"}>
                {props.mainNav}
              </Link>
            </li>
            <ArrowRight className="mx-4" size={"14px"} />
            <li className="">
              <Link className="text-primaryText" to={`/${props.secondaryNav}`}>
                {props.secondaryNav}
              </Link>
            </li>
            <ArrowRight
              className={`${props.secondaryNavDisplay} mx-4`}
              size={"14px"}
            />
            <li>
              <Link className="text-primaryText" to={`/${props.lastNav}`}>
                {props.lastNav}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Title;