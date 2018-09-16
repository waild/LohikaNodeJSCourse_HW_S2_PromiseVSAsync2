var rpm = require('./request-promise-manager');

const ReposToGetDetailsCount = 3;

function getContributors(organizationName) {
    if (typeof organizationName !== 'string' || !organizationName) {
        return Promise.reject('Wrong param type, param name: organizationName');
    }

    var repoContributors = {};
    return getOrganizationRepos(organizationName).then(response => {

        return Promise.all(
            response
            .slice(0, ReposToGetDetailsCount)
            .map(i => {
                var repoName = i.name;
                return rpm.getJson(i.contributors_url).then(response => {
                    repoContributors[repoName] = response.map(i => {
                        return i.login;
                    });
                });
            })).then(() => {
            return repoContributors;
        });
    });
};

function getOrganizationRepos(organizationName) {
    var uri = `https://api.github.com/orgs/${organizationName}/repos`;
    return rpm.getJson(uri);
};

module.exports = {
    getContributors
}