/**
 * 
 * 
 */

var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('chorus_sequelize', 'root', 'root', {
	host: '127.0.0.1',
	dialect: 'mysql',
	pool: {
		min: 0,
		max: 5,
		idle: 10000
	}
});

var Project = sequelize.define('project', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING,
		unique: true
	},
	description: Sequelize.TEXT,
	totalTeamMembers : {
		type: Sequelize.INTEGER,
		field: 'total_team_members'
	}
});

var Task = sequelize.define('task', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	project_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Project,
			key: 'id'	
		}
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: Sequelize.TEXT,
	deadline: Sequelize.DATE
});

//Relationship/Association

Project.hasMany(Task, {foreignKey: "project_id"});
Task.belongsTo(Project, {foreignKey: "project_id"});

sequelize.sync();

module.exports = {
	Project: Project,
	Task: Task
}
