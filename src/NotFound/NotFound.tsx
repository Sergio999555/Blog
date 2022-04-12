import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Not Found :("
    extra={<Link to="/articles">Back Home</Link>}
  />
);
