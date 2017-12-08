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
        } else {
            authButton.hidden = true;
            queryAccounts();
        }
    });
    var viewSelector1 = new gapi.analytics.ViewSelector({
        container: 'view-selector-1-container'
    });
    var viewSelector2 = new gapi.analytics.ViewSelector({
        container: 'view-selector-2-container'
    });
    viewSelector1.execute();
    viewSelector2.execute();

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
    viewSelector1.on('change', function(ids) {
      dataChart1.set({query: {ids: ids}}).execute();
    });
    viewSelector2.on('change', function(ids) {
    dataChart2.set({query: {ids: ids}}).execute();
  });
});
