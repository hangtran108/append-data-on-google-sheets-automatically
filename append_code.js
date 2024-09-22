function raw() {
    // Specify the query here.
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh_query = ss.getSheetByName("query"); // Name of the sheet containing your query
    var range = sh_query.getRange(1,1); // Cell position (row, col) containing your query
    var query = range.getValue();
    // Specify row and column number to output the query result.
    var output_row_starts = 1;
    var output_col_starts = 1;
    // Specify the final column number to clear data before displaying the result. (Optional)
    var delete_until_col = undefined;
    // delete_until_col = 3;
    runQuery_supply(query, output_row_starts, output_col_starts, delete_until_col, delete_until_col);
  }
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *  Do not touch the code below unless you know what you're doing.   *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  function onOpen_supply() {
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    toolbar = ui.createMenu('your project id');
    toolbar.addItem('Extract Data', 'extract_data').addToUi();
  }
  function runQuery_supply(query, output_row_starts, output_col_starts, delete_until_col) {
    // Replace this value with the project ID listed in the Google
    // Cloud Platform project.
    if (!output_row_starts) {
      output_row_starts = 1;
    }
    if (!output_col_starts) {
      output_col_starts = 1;
    }
    var projectId = 'your project id';
    var spreadsheet = SpreadsheetApp.getActive();
    var sheet = spreadsheet.getSheetByName("data daily"); // Name of the sheet that you want to import data to
    if (!delete_until_col) {
      var last_col = sheet.getLastColumn();
    } else {
      var last_col = delete_until_col;
    }
    var last_row = sheet.getLastRow();
    // sheet.getRange(output_row_starts, output_col_starts, Math.max(last_row - output_row_starts + 1, 1), Math.max(last_col - output_col_starts + 1, 1)).clearContent();
    var qtext = query;
    var request = {
      query: qtext,
      useLegacySql: false
    };
    var queryResults = BigQuery.Jobs.query(request, projectId);
    var jobId = queryResults.jobReference.jobId;
    /// Check on status of the Query Job.
    var sleepTimeMs = 500;
    while (!queryResults.jobComplete) {
      Utilities.sleep(sleepTimeMs);
      sleepTimeMs += 1000;
      queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {location : 'asia-southeast1'});
    }
    // Get all the rows of results.
    var rows = queryResults.rows;
    while (queryResults.pageToken) {
      queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
        pageToken: queryResults.pageToken,
        location: 'asia-southeast1' 
      });
      rows = rows.concat(queryResults.rows);
    }
    if (rows) {
      // Append the headers.
      var headers = queryResults.schema.fields.map(function(field) {
        return field.name;
      });
      // Append the results.
      var data = new Array(rows.length);
      // data[0] = new Array(headers.length);
      // for (header_i = 0; header_i < headers.length; header_i++) {
      //  data[0][header_i] = headers[header_i];
      // }
      for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].f;
        data[i] = new Array(cols.length);
        for (var j = 0; j < cols.length; j++) {
          data[i][j] = cols[j].v;
        }
      }
      SpreadsheetApp.flush();
      sheet.getRange(last_row+1, output_col_starts, rows.length, cols.length).setValues(data);
      SpreadsheetApp.flush();
      Logger.log('Run successfully');
    } else {
      Logger.log('No rows returned.');
    }
  }
    
