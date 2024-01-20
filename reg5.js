$(document).ready(function() {
    var courseData = {};

    function onContentChange(data) {
        var lastActivityDate = new Date().toISOString();

        // Extract custom profile fields
        var customFields = {};
        if (data.user.custom_profile_fields && data.user.custom_profile_fields.length > 0) {
            data.user.custom_profile_fields.forEach(function(field) {
                customFields[field.label] = field.value;
            });
        }

        // Define an array of custom field IDs you want to retrieve (1 to 4)
        var customFieldIds = [1, 2, 3, 4];

        // Create an object to store the custom field values
        var customFieldValues = {};

        // Iterate through the custom profile fields
        data.user.custom_profile_fields.forEach(function(field) {
            // Check if the field's ID is in the customFieldIds array
            if (customFieldIds.includes(field.custom_profile_field_definition_id)) {
                // Use the field's ID as the key and store its value
                customFieldValues[field.custom_profile_field_definition_id] = field.value;
            }
        });

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
            lastActivityDate: lastActivityDate,
            customFields: customFieldValues // Add custom fields to courseData
        };

        logDataToServer();
    }

    function logDataToServer() {
        $.ajax({
            url: 'https://sb1.guidem.ph/users/submitdata', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(courseData),
            success: function(response) {
                console.log('Course data logged successfully:', response);
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
