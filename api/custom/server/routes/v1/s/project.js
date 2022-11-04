const passport = require('passport')

module.exports = async server => {

    const { express } = server

    const ProjectService = require('../../../../../custom/services/project')

    const projectService = await ProjectService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/projects',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await projectService.getProjects(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/project/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await projectService.getProjectById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.post(
        process.env.API_PREFIX + '/v1/s/project',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await projectService.createProject(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.put(
        process.env.API_PREFIX + '/v1/s/project/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await projectService.updateProjectById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.delete(
        process.env.API_PREFIX + '/v1/s/project/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await projectService.deleteProjectById(req)

            res
                .status(result.status)
                .end()

        }
    )

}
