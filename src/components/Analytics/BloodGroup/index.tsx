import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Config from "../../../Config";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.getAnalytics;


class BloodGroup extends Component {
  state = {
    chartData: {}
  };
  componentDidMount() {
    axios.get(session_url, {
      auth: {
        username,
        password
      }
    })
      .then((response: any) => {
        let pair = response.data.response.bloodGroup;
        let tags = [];
        let values = [];
        for (var index in pair) {
          tags.push(pair[index]._id.bloodGroup + pair[index]._id.rhType);
          values.push(pair[index].total);
        }
        console.log(pair);
        console.log(tags);
        console.log(values);
        this.setState({
          chartData: {
            labels: tags,
            datasets: [{
              label: "Blood Groups",
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(341, 120, 54, 0.2)',
                'rgba(700, 99, 300, 0.2)'
              ],
            }]
          }
        })
      }).catch(function (error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }

  render() {
    return (
      <div>
        <h5 className="style-chart-title">Blood Group</h5>
        <Bar data={this.state.chartData} options={{}} />
      </div>
    );
  }
}
export default BloodGroup;