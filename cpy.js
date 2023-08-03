<!-- HTML Structure -->
<pre>/* Your code here */</pre>

<script>
  // Helper function to create SVG icons
  function createSVG(icon) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${icon}</svg>`;
  }

  $(document).ready(function() {
    const addCopyButton = function() {
      $("pre").each(function(index) {
        const $codeBlock = $(this);
        const codeText = $codeBlock.text();

        // Create the copy button and icon
        const id = "kapow-copy-" + index;
        const svgClip =
          '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>';
        const svgCheck =
          '<path d="M5.293 9.293a1 1 0 0 0 1.414 0L10 6.414l3.293 3.293a1 1 0 1 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414z"></path>';

        const buttonStyle =
          "color:#ffffff;cursor: pointer;display: flex;justify-content: flex-end;align-items: center;background-color:#343541;padding: 0.5rem 1rem;width:100%;text-align:right;font-size: .75rem;line-height: 1rem;border-bottom-left-radius: 0.375rem;border-bottom-right-radius: 0.375rem;";

        const buttonHtml = `<div class="kapow-copy-btn" data-id="${id}" style="${buttonStyle}">
                              <span class="copy-icon" style="display:flex;">${createSVG(svgClip)}</span>
                              <span class="copy-text" style="padding-left:5px;">Copy Code</span>
                            </div>`;

        // Insert the button after the code block
        $codeBlock.after(buttonHtml);

        // Handle click event to copy code
        $(`[data-id="${id}"]`).click(function() {
          const textArea = $("<textarea>").val(codeText).appendTo("body").select();
          document.execCommand("copy");
          textArea.remove();

          // Update button text and icon
          $(`[data-id="${id}"] .copy-text`).text("Code Copied");
          $(`[data-id="${id}"] .copy-icon`).html(createSVG(svgCheck));

          setTimeout(function() {
            $(`[data-id="${id}"] .copy-text`).text("Copy Code");
            $(`[data-id="${id}"] .copy-icon`).html(createSVG(svgClip));
          }, 3000);
        });
      });
    };

    if (typeof CoursePlayerV2 !== "undefined") {
      CoursePlayerV2.on("hooks:contentDidChange", function(data) {
        setTimeout(function() {
          addCopyButton();
        }, 1000);
      });
    } else {
      addCopyButton();
    }
  });
</script>
