gapi.analytics.ready(function() {
    var CLIENT_ID = '655224599525-3sciflmg9phgn3uestlml3vcab0qjedo.apps.googleusercontent.com';
    var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
    gapi.analytics.auth.authorize({
        container: 'embed-api-auth-container',
        clientid: 'CLIENT_ID',
        scope: 'SCOPES'
    });
    gapi.auth.authorize(authData, function(response) {
      var authButton = document.getElementById('auth-button');
      if (response.error) {
        authButton.hidden = false;
      }
      else {
        authButton.hidden = true;
        queryAccounts();
      }
    });
    var viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector-container'
    });
    viewSelector.execute();
    var dataChart = new gapi.analytics.googleCharts.DataChart({
        query: {
            metrics: 'ga:sessions',
            dimensions: 'ga:date',
            'start-date': '30daysAgo',
            'end-date': 'yesterday'
        },
        chart: {
            container: 'chart-container',
            type: 'LINE',
            options: {
                width: '100%'
            }
        }
    });
    viewSelector.on('change', function(ids) {
        dataChart.set({ query: { ids: ids } }).execute();
    });
});
