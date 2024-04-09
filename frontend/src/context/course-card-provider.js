import React, { useState } from "react";
import { CourseCardContext } from "./course-card-context";

/**
 * The main context provider
 */
export const CourseCardContextProvider = (props) => {
  /**
   * Using react hooks, set the default state
   */
  const [state, setState] = useState([]);

  /**
   * Declare the update state method that will handle the state values
   */
  const updateState = (newState) => {
    setState(newState);
  };

  /**
   * Context wrapper that will provider the state values to all its children nodes
   */
  return (
    <CourseCardContext.Provider
      value={{ courseCardsTemp: state, updateState: updateState }}
    >
      {props.children}
    </CourseCardContext.Provider>
  );
};
