const rpm = require('./request-promise-manager');

const ReposToGetDetailsCount = 3;

const getContributorsAsync = async (organizationName) => {
    if (typeof organizationName !== 'string' || !organizationName) {
        throw new Error('Wrong param type, param name: organizationName');
    }
    const repos = await getOrganizationRepos(organizationName);
    return repos
        .slice(0, ReposToGetDetailsCount)
        .reduce(async (promisedAcumulator, repo) => {
            const accumulator = await promisedAcumulator;
            const contributors = await rpm.getJson(repo.contributors_url);
            accumulator[repo.name] = contributors.map(i => {
                return i.login;
            });
            return accumulator;
        }, Promise.resolve({}));
};

function getOrganizationRepos(organizationName) {
    const uri = `https://api.github.com/orgs/${organizationName}/repos`;
    return rpm.getJson(uri);
};

module.exports = {
    getContributorsAsync
}