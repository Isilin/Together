(async () => {
    const [React, ReactDOM, ReactRouter] = await Promise.all([
        import('react'),
        import('react-dom'),
        import('react-router')
    ]).catch(reason => {
        console.log(reason);
    });

    ReactDOM.render(
        <ReactRouter.ReactRouter>
        </ReactRouter.ReactRouter>
    );
})();