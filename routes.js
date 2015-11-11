/**
 * 
 * 
 */

var Sequelize = require('sequelize');
var models = require('./lib/sequelize');

module.exports = function(app) {
	
	console.log("In routes");
	
	app.get('/', function(req, res, next) {
		
		models.Project.findAll()
		.then(function(projectDocs) {
			return res.render('index', {projects: projectDocs});
		}).catch(function(err) {
			return next(err);
		})
	});
	
	app.get('/add_project', function(req, res, next) {
		
		return res.render('add-project');
		
	});
	
	app.post('/projects', function(req, res, next) {
		models.Project.create(req.body)
		.then(function(project) {
			return res.redirect('/');
		}).catch(function(err) {
			return next(err);
		})	
		
	});
	
	/*app.get('/projects', function(req, res, next) {
		
		models.Project.findAll()
		.then(function(projectDocs) {
			return res.json(projectDocs);
		}).catch(function(err) {
			return next(err);
		})
		
	});*/
	
	app.get('/edit_project/:id', function(req, res, next) {
		
		models.Project.findById(req.params.id)
		.then(function(project) {
			return res.render('add-project', {project: project});
		}).catch(function(err) {
			return next(err);
		}) 
	});
	
	app.post('/edit_project/:id', function(req, res, next) {
		
		models.Project.update(req.body, {
			where: {id: req.params.id}
		}).then(function() {
			return res.redirect("/");
		}).catch(function(err) {
			return next(err);
		})
	});
	
	app.get('/delete_project/:id', function(req, res, next) {
		
		models.Project.destroy({
			where: {
				id: req.params.id
			}
		}).then(function() {
			return res.redirect("/");
		}).catch(function(err) {
			return next(err);
		})
		
	});
	
	//Tasks	
	app.get('/projects/:id/tasks', function(req, res, next) {
		
		models.Project.findById(req.params.id)
		.then(function(project) {
			models.Task.findAll({
				where: {
					project_id: req.params.id
				},
				include: [models.Project]
			}).then(function(tasks) {
				//return res.json(tasks);
				return res.render('tasks', {tasks: tasks, project: project});
			}).catch(function(err) {
				return next(err);
			});	
		}).catch(function(err) {
			return next(err);
		})		
	});
	
	app.get('/projects/:id/add_task', function(req, res, next) {
		
		res.render('add_task', {project_id: req.params.id});
	});
	
	app.post('/projects/:id/tasks', function(req, res, next) {
		
		models.Task.create(req.body)
		.then(function(task){
			return res.redirect('/projects/' + req.params.id + '/tasks')
		}).catch(function(err) {
			return next(err);
		});		
	});
	
	app.get('/projects/:id/edit_task/:task_id', function(req, res, next) {
		
		
		
		models.Task.findOne({
			where: {
				id: req.params.task_id
			}
		}).then(function(task) {
			return res.render('add_task', {task: task, project_id: req.params.id});
		}).catch(function(err) {
			return next(err);
		})
		
	});
	
	app.post('/projects/:id/edit_task/:task_id', function(req, res, next) {
		
		models.Task.update(req.body, {
			where: {
				id: req.params.task_id
			}
		})
		.then(function(task){
			return res.redirect('/projects/' + req.params.id + '/tasks');			
		}).catch(function(err) {
			return next(err);
		});		
	});
	
	app.get('/projects/:id/delete_task/:task_id', function(req, res, next) {
		
		models.Task.destroy({
			where: {
				id: req.params.task_id
			}
		}).then(function() {
			return res.redirect('/projects/' + req.params.id + '/tasks');			
		}).catch(function(err) {
			return next(err);
		});
		
	});
	
}

