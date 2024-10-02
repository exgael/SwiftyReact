import React from 'react';
import PropTypes from 'prop-types';

const generateObjectHash = item => {
    // Simple hash function for basic purposes
    return JSON.stringify(item)
        .split('')
        .reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
};

/**
 * ForEach component
 * @type {React.NamedExoticComponent<{readonly data?: *, readonly viewBuilder?: *, readonly style?: *, readonly events?: *}>}
 */
const ForEach = React.memo(({ data, viewBuilder, style, events }) => {
    const foreachStyle = {
        display: 'contents',
        ...style,
    };

    const foreachEvents = {
        ...events,
    };

    return (
        <div style={foreachStyle} {...foreachEvents}>
            {data &&
                data.map((item, index) => (
                    <React.Fragment key={generateObjectHash(item + index)}>
                        {viewBuilder(item, index)}
                    </React.Fragment>
                ))}
        </div>
    );
});

ForEach.propTypes = {
    data: PropTypes.array.isRequired,
    viewBuilder: PropTypes.func.isRequired,
    style: PropTypes.object,
    events: PropTypes.object,
};

ForEach.defaultProps = {
    style: {},
    events: {},
};

ForEach.displayName = 'ForEach';

export default ForEach;