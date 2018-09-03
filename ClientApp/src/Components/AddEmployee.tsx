import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EmployeeData } from './FetchEmployee';

interface IAddEmployeeDataState {
    title: string;
    loading: boolean;
    cityList: string[];
    empData: EmployeeData;
}

export class AddEmployee extends React.Component<RouteComponentProps<{}>, IAddEmployeeDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cityList: [], empData: new EmployeeData };

        fetch('api/Employee/GetCityList')
            .then(response => response.json() as Promise<any[]>)
            .then(data => {
                this.setState({ cityList: data });
            });

        const empid = this.props.match.params["empid"];

        // This will set state for Edit employee
        if (empid > 0) {
            fetch('api/Employee/Details/' + empid)
                .then(response => response.json() as Promise<EmployeeData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }

        // This will set state for Add employee
        else {
            this.state = { title: "Create", loading: false, cityList: [], empData: new EmployeeData };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        const contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Employee</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee.
        if (this.state.empData.employeeId) {
            fetch('api/Employee/Edit', {
                body: data,
                method: 'PUT',
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }

        // POST request for Add employee.
        else {
            fetch('api/Employee/Create', {
                body: data,
                method: 'POST',
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchemployee");
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm(cityList: any[]) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name}/>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender}>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.empData.department} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.empData.city}>
                            <option value="">-- Select City --</option>
                            {cityList.map(city =>
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}