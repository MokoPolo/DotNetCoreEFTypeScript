import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface IFetchEmployeeDataState {
    empList: EmployeeData[];
    loading: boolean;
}

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, IFetchEmployeeDataState> {
    constructor(...args: any[]) {
        super(args);
        this.state = {
            empList: [{ employeeId: 1, name: "Jasmine" }, { employeeId: 2, name: "Justin" }],
            loading: true
        };

        // This binding is necessary to make "this" work in the callback 
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        const contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeeTable(this.state.empList);

        return <div>
            <h1>Employee Data</h1>
            <p>This component demonstrates fetching Employee data from the server.</p>
            {contents}
        </div>;
    }

    // Handle Delete request for an employee 
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete employee with Id: " + id)) {
            return;
        }
        else {
            fetch('api/Employee/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.employeeId !== id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/employee/edit/" + id);
    }

    // Returns the HTML table to the render() method. 
    private renderEmployeeTable(empList: EmployeeData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>EmployeeId</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.employeeId}>
                        <td>q</td>
                        <td>{emp.employeeId}</td>
                        <td>{emp.name}</td>
                        <td>edit/delete
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class EmployeeData {
    public employeeId: number = 0;
    public name: string = "";
}