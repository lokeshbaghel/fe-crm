import React, {Component} from 'react';
import Chart from 'react-apexcharts'; 

class ComparisionGraph extends Component{
    state = {
        series : this.props?.graphData?.comparisionData,
        options: {
            chart: {
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: 3,
                //dashArray: [0, 5],
                //curve: 'smooth'
            },
            labels: this.props?.graphData?.xaxisLabels,
            xaxis: {
                type: 'categories',
                labels: {
                    showDuplicates: false,
                    hideOverlappingLabels: false,
                    minHeight : 50,
                    maxHeight : 100,
                }
            },
            // yaxis: {
            //     title: {
            //         text: 'Accounts',
            //     },
            //     min: 0
            // },
            tooltip: {
                shared: true,
                intersect: false,
            },
            colors: ['#FFA500', '#EAEBF1', '#CEEBED', '#979798', '#FFB2B2']
        }
    }

    render() {
        const {options, series} = this.state;

        return (
            <div id="chart">
                <Chart options={options} series={series} type="line" height={350} />
            </div>
        )
    }        
}

export default ComparisionGraph;