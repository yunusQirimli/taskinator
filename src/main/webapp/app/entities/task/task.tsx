import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Task = (props: ITaskProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { taskList, match, loading } = props;
  return (
    <div>
      <h2 id="task-heading">
        <Translate contentKey="taskinatorApp.task.home.title">Tasks</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="taskinatorApp.task.home.createLabel">Create new Task</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {taskList && taskList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.color">Color</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.createDate">Create Date</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.modificationDate">Modification Date</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.dueDate">Due Date</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.completeDate">Complete Date</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.parentTask">Parent Task</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.boardColumn">Board Column</Translate>
                </th>
                <th>
                  <Translate contentKey="taskinatorApp.task.applicationUser">Application User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {taskList.map((task, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${task.id}`} color="link" size="sm">
                      {task.id}
                    </Button>
                  </td>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>
                    <Translate contentKey={`taskinatorApp.Color.${task.color}`} />
                  </td>
                  <td>
                    <TextFormat type="date" value={task.createDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={task.modificationDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={task.dueDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={task.startDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={task.completeDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{task.parentTask ? <Link to={`task/${task.parentTask.id}`}>{task.parentTask.name}</Link> : ''}</td>
                  <td>{task.boardColumn ? <Link to={`board-column/${task.boardColumn.id}`}>{task.boardColumn.name}</Link> : ''}</td>
                  <td>
                    {task.applicationUser ? <Link to={`application-user/${task.applicationUser.id}`}>{task.applicationUser.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${task.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${task.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${task.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="taskinatorApp.task.home.notFound">No Tasks found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ task }: IRootState) => ({
  taskList: task.entities,
  loading: task.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Task);
