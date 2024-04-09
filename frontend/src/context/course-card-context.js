import React from "react";

/**
 * Default application state
 */
const defaultState = {
  courseCardsTemp: [],
  updateState: (newState) => [],
};

/**
 * Creating the Application state context for the provider
 */
export const CourseCardContext = React.createContext(defaultState);
