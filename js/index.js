gapi.analytics.ready(function() {
    var clientID = '655224599525-3sciflmg9phgn3uestlml3vcab0qjedo.apps.googleusercontent.com';
    var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
    gapi.analytics.auth.authorize({
        container: 'embed-api-auth-container',
        clientid: clientID,
        scope: SCOPES
    });
     var viewSelector = new gapi.analytics.ViewSelector({
      container: 'view-selector-container'
    });
    viewSelector.execute();

    var mainChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        'dimensions': 'ga:browser',
        'metrics': 'ga:sessions',
        'sort': '-ga:sessions',
        'max-results': '6'
      },
      chart: {
        type: 'TABLE',
        container: 'main-chart-container',
        options: {
          width: '100%'
        }
      }
    });

    var dataChart1 = new gapi.analytics.googleCharts.DataChart({
        query: {
            metrics: 'ga:sessions',
            dimensions: 'ga:date',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
            'max-results': 6,
            sort: '-ga:sessions'
        },
        chart: {
            container: 'chart-1-container',
            type: 'PIE',
            options: {
                width: '100%',
                pieHole: 4 / 9
            }
        }
    });
    var dataChart2 = new gapi.analytics.googleCharts.DataChart({
        query: {
            metrics: 'ga:sessions',
            dimensions: 'ga:country',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
            'max-results': 6,
            sort: '-ga:sessions'
        },
        chart: {
            container: 'chart-2-container',
            type: 'PIE',
            options: {
                width: '100%',
                pieHole: 4 / 9
            }
        }
    });

    var breakdownChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        'dimensions': 'ga:date',
        'metrics': 'ga:sessions',
        'start-date': '7daysAgo',
        'end-date': 'yesterday'
      },
      chart: {
        type: 'LINE',
        container: 'breakdown-chart-container',
        options: {
          width: '100%'
        }
      }
    });

  var mainChartRowClickListener;
  viewSelector.on('change', function(ids) {
    var options = {query: {ids: ids}};
      if (mainChartRowClickListener) {
        google.visualization.events.removeListener(mainChartRowClickListener);
      }
      mainChart.set(options).execute();
      breakdownChart.set(options)
      if (breakdownChart.get().query.filters) breakdownChart.execute();
      dataChart1.set({query: {ids: ids}}).execute();
      dataChart2.set({query: {ids: ids}}).execute();
  });
  mainChart.on('success', function(response) {
    var chart = response.chart;
    var dataTable = response.dataTable;
    mainChartRowClickListener = google.visualization.events.addListener(chart, 'select', function(event) {
      if (!chart.getSelection().length) return;
      var row =  chart.getSelection()[0].row;
      var browser =  dataTable.getValue(row, 0);
      var options = {
        query: {
          filters: 'ga:browser==' + browser
        },
        chart: {
          options: {
            title: browser
          }
        }
      };
      breakdownChart.set(options).execute();
    });
  });
});
