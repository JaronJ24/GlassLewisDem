const {HomePage} = require('./HomePage');
const {VoteCardPage} = require('./VoteCardPage');

class POManager
{
constructor(page)
{
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.voteCardPage = new VoteCardPage(this.page);
}

getHomePage()
{
    return this.homePage;
}

getVoteCardPage()
{
    return this.voteCardPage;
}
}
module.exports = {POManager};