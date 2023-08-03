<!-- HTML Structure -->
<pre>/* Your code here */</pre>

<!-- Add Bootstrap CSS link here if you haven't already -->
<!-- Add jQuery link here if you haven't already -->

<script>
  $(document).ready(function() {
    const addCopyButton = function() {
      $("pre").each(function(index) {
        const $codeBlock = $(this);
        const codeText = $codeBlock.text();

        // Create the copy button and icon
        const id = "kapow-copy-" + index;
        const svgClip =
          '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
        const svgCheck =
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="1rem" height="1rem" fill-rule="nonzero"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M19.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-10.29297,10.29297l-3.29297,-3.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l4,4c0.39053,0.39037 1.02353,0.39037 1.41406,0l11,-11c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path></g></g></svg>';

        const buttonStyle =
          "color:#ffffff;cursor: pointer;display: flex;justify-content: flex-end;align-items: center;background-color:#343541;padding: 0.5rem 1rem;width:100%;text-align:right;font-size: .75rem;line-height: 1rem;border-bottom-left-radius: 0.375rem;border-bottom-right-radius: 0.375rem;";

        const buttonHtml = `<div class="kapow-copy-btn" data-id="${id}" style="${buttonStyle}">
                              <span class="copy-icon" style="display:flex;">${svgClip}</span>
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
          $(`[data-id="${id}"] .copy-icon`).html(svgCheck);

          setTimeout(function() {
            $(`[data-id="${id}"] .copy-text`).text("Copy Code");
            $(`[data-id="${id}"] .copy-icon`).html(svgClip);
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
