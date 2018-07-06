/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        function checkDefined(item, index) {
            expect(item).toBeDefined('The value is not defined at array index: ' + index);
            expect(item.length).not.toBe(0, 'The value is empty at array index: ' + index);
        }

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed url is defined and not empty', function() {
            allFeeds.forEach(function(feed, index) {
                checkDefined(feed.url, index);
            });
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed name is defined and not empty', function() {
            allFeeds.forEach(function(feed, index) {
                checkDefined(feed.name, index);
            });
        });
    });


    /* This test suite covers the menu element behaviour */
    describe('The menu', function() {
        const menuIcon = $('.menu-icon-link');
        /* This is a test that ensures the menu element is
         * hidden by default.
         */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true, 'There is no "menu-hidden" class');
        });

        /* This is a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('element changes visibility when menu icon is clicked', function() {
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false, 'The menu did not appear');
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true, 'The menu did not hide');
        });
    });

    /* This test suite covers ensures that initial entries are loaded at startup */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('are loaded', function(done) {
            expect($('.feed').length).toBeGreaterThan(0, 'The feed container is empty');
            expect($('.feed .entry').length).toBeGreaterThan(0, 'There are no feed entries');
            done();
        });
    });

    /* This test suite ensures that a new feed is loaded
     * and replaces the old content of the feed container.
     */
    describe('New Feed Selection', function() {
        let feedOne,
            feedTwo;

        /* Some preparations before testing.
         * Selecting new feed and remember
         * the content of both ones
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOne = $('.feed').html();
                loadFeed(1, function() {
                    feedTwo = $('.feed').html();
                    done();
                });
            });
        });

        // Restore the content of the feed container after tests
        afterAll(function(done) {
            loadFeed(0, done);
        });

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('is loaded', function() {
            expect(feedOne).toBeDefined('Feed One is undefined');
            expect(feedTwo).toBeDefined('Feed Two is undefined');
            expect(feedOne.length).not.toBe(0, 'Feed One is empty');
            expect(feedTwo.length).not.toBe(0, 'Feed Two is empty');
            expect(feedOne).not.toEqual(feedTwo);
        });
    });
}());
