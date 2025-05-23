/**
 * Copyright © 2025, Oracle and/or its affiliates.
 * This software is licensed to you under the Universal Permissive License (UPL) 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
import { Webview, Uri } from "vscode";
import { getUri } from "../utils/getUri";

export function EditScriptGetWebview(webview: Webview, extensionUri: Uri, scriptName: string, scriptId: string, scriptContentEncoded: string) {
   const css_path = ["media", "css"];
   const js_path = ["media", "js", "script"];
   const decodeScriptContent = getUri(webview, extensionUri, js_path.concat(["decodeScriptContent.js"]));
   const submitForm = getUri(webview, extensionUri, js_path.concat(["editForm.js"]));
   const tableStyle = getUri(webview, extensionUri, css_path.concat(["synthetics.css"]));
   const svg_path = ["resources", "dark"];
   const errorSvg = getUri(webview, extensionUri, svg_path.concat(["error.svg"]));

   const showInputs = "display: none";

   return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
       <meta charsset="UTF-8">
       <meta http-equiv="Content-Security-Policy">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link rel="stylesheet" href="${tableStyle}"> 
       <script id="script_content_decode_js" type="module" src="${decodeScriptContent}">${scriptContentEncoded}</script>
       <script type="module" src="${submitForm}"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.min.js"></script>
       <title>Edit Script</title>
       <style>
       </style>
    </head>
    <body id="webview-body">
       <h1>Edit Script</h1>
       <h5>Script OCID: ${scriptId}</h5>

       <form id="form_edit_script" method="post" action="*">
         <div class="row">
            <div class="column" id="col1-div">
               <label class="label-margin" for="script-name-input" id="script-name-label">Script Name</label>&nbsp;
               <input class="input-margin input-block oui-react-input" placeholder="Enter script name" type="text" id="script-name-input" value="${scriptName}" />
               <input type="hidden" id="script-id-input" value="${scriptId}"/>
               <div class="oui-display-hint-padding">
                  <div class="oui-text-small oui-text-muted" id="script-hint">
                     No spaces, only letters, numerals, hyphens or underscores.
                  </div>
               </div>
               <div class="oui-display-hint-padding">
                  <div class="oui-text-small oui-form-danger oui-margin-small-bottom" id="script-error" style="${showInputs}">
                     <img src="${errorSvg}"/><div id="script-error-text">Script name is required.</div>
                  </div>
               </div>

               <label class="label-margin" for="script-file-input" id="script-file-label" >Script File</label>
               <input class="input-margin input-block oui-react-input" placeholder="Select script file" accept=".side" type="file" id="script-file-input"/>
               <input id="fileContents" type="hidden" />
               <div class="oui-display-hint-padding">
                  <div class="oui-text-small oui-form-danger oui-margin-small-bottom" id="script-file-error" style="${showInputs}">
                     <img src="${errorSvg}"/><div id="script-error-file">Invalid script file.</div>
                  </div>
               </div>

               <div class="file input text" id="file-text-div">
                  <textarea class="textarea-margin textarea-size input-block oui-react-input" placeholder="Enter SIDE file content" id="file-text-input" ></textarea>
                  <div class="oui-display-hint-padding">
                     <div class="oui-text-small oui-form-danger oui-margin-small-bottom" id="file-text-input-error" style="${showInputs}">
                        <img src="${errorSvg}"/><div id="file-text-error">Invalid SIDE file.</div>
                     </div>
                  </div>
               </div>   

            </div>
         </div>

         <div class="button-margin float-container" id="form-buttons" >
            <button type="submit" value="Update" id="edit-button">Update</button>
            &nbsp;&nbsp;
            <button value="Cancel" id="cancel-button">Cancel</button>
         </div>

       </form>
    </body>
    
 </html>
    `;
}
