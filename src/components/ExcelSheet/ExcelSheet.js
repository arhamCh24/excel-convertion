"use client";

import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Form, Row } from "react-bootstrap";
import Button from "../Button/Button";

export default function ExcelSheet() {
  const fileInputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        console.log(data);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleButtonClick = async (e) => {
    const file = fileInputRef.current.files[0];

    if (!file) {
      console.log("No file selected.");
      return;
    }

    const allowedExtensions = ["xls", "xlsx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage("Only Excel files are allowed.");
      return;
    } else {
      setErrorMessage(""); // Clear the error message if a valid file is uploaded
    }

    try {
      const data = await readExcel(file);

      if (data.length === 0) {
        console.log("No data found in the Excel sheet.");
        return;
      }

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const _id = item.id;
        const FirstName = item.FirstName;
        const LastName = item.LastName;
        const Gender = item.Gender;
        const Country = item.Country;
        const Age = item.Age;
        const Date = item.Date;

        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            FirstName,
            LastName,
            Gender,
            Country,
            Age,
            Date,
          }),
        });

        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
      }

      // Fetch data again after posting to API to get updated data
      fetchData();
    } catch (error) {
      console.error(error);
    }

    e.preventDefault();
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input type="file" ref={fileInputRef}/>
      <Button text="Submit" onClick={handleButtonClick} />
      <br />
      <br />
      <br />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Row>
        <Col lg={12}>
          <h3>The Data of The Uploaded Excel Sheet</h3>
          <Table striped bordered hover variant="warning">
            <thead>
              <tr>
                <th>id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Age</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((datas, index) => (
                <tr key={index}>
                  <td>{datas._id}</td>
                  <td>{datas.FirstName}</td>
                  <td>{datas.LastName}</td>
                  <td>{datas.Gender}</td>
                  <td>{datas.Country}</td>
                  <td>{datas.Age}</td>
                  <td>{datas.Date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}


