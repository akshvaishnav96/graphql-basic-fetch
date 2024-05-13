import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      title
      id
      user {
        name

        address {
          city
          street
          zipcode
          geo {
            lat
            lng
          }
        }
      }
    }
  }
`;
function App() {
  const { data, loading } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div>
        <table border={"1"}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Created By</th>
              <th colSpan={3}>Address</th>
              <th colSpan={2}>Geo</th>
            </tr>
          </thead>
          <tbody>
            {data.getTodos.map((data, i) => (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.user.name}</td>
                <td>{data.user.address.city}</td>
                <td>{data.user.address.street}</td>
                <td>{data.user.address.zipcode}</td>
                <td>{data.user.address.geo.lat}</td>
                <td>
                  {data.user.address.geo.lng
                    ? data.user.address.geo.lng
                    : "Not Defined"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
