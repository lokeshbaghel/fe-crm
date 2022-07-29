import React, {Component} from 'react';
import Chart from 'react-apexcharts'; 
import moment from 'moment';

class EnquiryTargetGraph extends Component{
    state = {
        series: [{
            name: 'Enquiry',
            type: 'area',
            data: this.props?.graphData?.enquiryData
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
                dashArray: [0, 8],
                //curve: 'smooth'
            },
            labels: this.props?.graphData?.xaxisLabels,
            xaxis: {
                type: 'datetime',
                min: new Date(this.props?.graphData?.xaxisLabels[0]).getTime(),
                max: new Date(this.props?.graphData?.xaxisLabels[this.props?.graphData?.xaxisLabels.length-1]).getTime(),
                labels: {
                    showDuplicates: false,
                    hideOverlappingLabels: true,
                    rotate : -45,
                    rotateAlways : true,
                    minHeight : 50,
                    maxHeight : 100,
                    formatter: function(val) {
                        return moment(new Date(val)).format("DD MMM YYYY");
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Targets',
                },
                min: 0
            },
            tooltip: {
                shared: true,
                intersect: false,
            },
            colors: ['#ADD8E6', '#909397']
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

export default EnquiryTargetGraph;