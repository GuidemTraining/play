$(document).ready(function() {
    var courseData = {};

    function onContentChange(data) {
        var lastActivityDate = new Date().toISOString();

        courseData = {
            courseId: data.course.id,
            courseName: data.course.name,
            courseSlug: data.course.slug,
            lessonId: data.lesson.id,
            lessonName: data.lesson.name,
            lessonSlug: data.lesson.slug,
            chapterName: data.chapter.name,
            chapterId: data.chapter.id,
            userId: data.user.id,
            userName: data.user.full_name,
            userFirstName: data.user.first_name,
            userEmail: data.user.email, 
            lastActivityDate: lastActivityDate 
        };

        logDataToServer();
    }

    function logDataToServer() {
        $.ajax({
            url: 'https://sb1.guidem.ph/users/cwr-reg', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(courseData),
            success: function() {
                console.log('Course data logged successfully.');
            },
            error: function(xhr, status, error) {
                console.error('Error logging course data:', error);
            }
        });
    }

    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }

});
