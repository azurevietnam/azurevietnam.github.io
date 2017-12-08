gapi.analytics.ready(function() {
    gapi.analytics.auth.authorize({
        container: 'embed-api-auth-container',
        clientid: 'UA-108605429-1'
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