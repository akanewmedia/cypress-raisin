import { forEach, isNil, keys, map, replace } from "lodash";
import ApiTestRail from 'api-testrail';
const testRailCaseIdRE = /^TR\(([0-9]*)\).*[0-9]+$/;

// Implementation based on https://jasmine.github.io/tutorials/custom_reporter
export class TestrailReporter {
    testrailAPI: ApiTestRail;
    runName: any;
    projectId: any;
    testrailRunId: any;
    testrailCases: any;
    // command example: protractor conf.js --params.env=prod --params.testrail.enabled=true
    constructor(testrail: ApiTestRail) {
        this.testrailAPI = new ApiTestRail(
            testrail.host,
            testrail.user,
            testrail.password
        );
        this.runName = testrail.runName;
        this.projectId = testrail.projectId;
        this.testrailRunId = testrail.runId;
    }

    jasmineStarted(suiteInfo) {
        console.log('TestRail reporter started');
        console.debug('Running suite with ' + suiteInfo.totalSpecsDefined + ' specs');
        if (!isNil(this.testrailRunId)) {
            return this.testrailAPI.getTests(this.testrailRunId).then(function (result) {
                var previousCases = map(result.body, 'case_id');
                console.debug('Previous cases: ' + JSON.stringify(previousCases));
                forEach(previousCases, function (caseId) {
                    this.testrailAPI.updateCase(caseId, null);
                });
                this.testrailCases = this.testrailAPI.getCases(this.projectId)
            });
        }
    }

    suiteStarted(result) {
        if (testRailCaseIdRE.test(result.fullName)) {
            var caseId = testRailCaseIdRE.exec(result.fullName)[1];
            this.testrailAPI.updateCase(caseId, null);
            if (!this.testrailRunId) {
                var content = {
                    name: this.runName,
                    case_ids: keys(this.testrailCases),
                    include_all: false
                };
                return this.testrailAPI.addRun(this.projectId, content).then(function (result) {
                    this.testrailRunId = result.body.id;
                });
            } else {
                var content = {
                    case_ids: keys(this.testrailCases)
                };
                // necessary to pass all the test cases ids in every call of testrailAPI.updateRun
                return this.testrailAPI.updateRun(this.testrailRunId, content);
            }
        }
    }

    specStarted(result) {
        console.debug('Spec started: ' + result.fullName);
    }

    specDone(result) {
        var suiteFullName = replace(result.fullName, ' ' + result.description, '');
        if (testRailCaseIdRE.test(suiteFullName)) {
            var caseId = testRailCaseIdRE.exec(suiteFullName)[1];
            var caseStatus = this.testrailCases[caseId]; // true if passed so far, false if any step failed
            switch (result.status) {
                case 'passed':
                    caseStatus = isNil(caseStatus) ? true : (caseStatus && true);
                    break;
                case 'failed':
                    caseStatus = isNil(caseStatus) ? false : (caseStatus && false);
                    break;
                case 'disabled':
                default:
                    break;
            }
            this.testrailAPI.updateCase(caseId, caseStatus);
        }
    }

    // Not using result.status of suiteDone because of the behaviour described here
    // https://github.com/jasmine/jasmine/issues/921
    suiteDone(result) {
        if (testRailCaseIdRE.test(result.fullName)) {
            var caseId = testRailCaseIdRE.exec(result.fullName)[1];
            var caseStatus = this.testrailCases[caseId];
            if (!isNil(caseStatus)) {
                var status_id = caseStatus ? 1 : 5;
                console.debug('Suite id:' + result.id + ' has testcase ' + caseId + ' with status_id=' + status_id);
                return this.testrailAPI.addResultForCase(this.testrailRunId, caseId, { "status_id": status_id });
            }
        }
    }

    jasmineDone(suiteInfo) {
        console.log('TestRail reporter finished');
        console.debug(JSON.stringify(suiteInfo));
    }

}
