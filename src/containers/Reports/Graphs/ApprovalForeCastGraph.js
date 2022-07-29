import React, {Component} from 'react';
import Chart from 'react-apexcharts'; 

class ApprovalForeCastGraph extends Component{
    state = {
        series: [{
            name: 'Accounts',
            type: 'area',
            data: this.props?.graphData?.accountData
        },{
            name: 'Forecast',
            type: 'area',
            data: this.props?.graphData?.foreCastData
        }, {
            name: 'Target',
            type: 'line',
            data: this.props?.graphData?.targetData
        }],
        options: {
            chart: {
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: [0, 2, 5],
                dashArray: [0, 5],
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
            colors: ['#75C5C8','#C9DCDB', '#909397']
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

export default ApprovalForeCastGraph;