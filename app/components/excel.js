
import React from 'react';
import read from 'read-file';

/* Schema
Name Role Address Telephone Floor Email
*/

export default class Excel extends React.Component {
    render() {
        const foo = 'R:\GTIS\NCS\EU\DISPATCH\Technical Advisors\ESS\Client List\PWGSC\ESS List - April 30th 2019.xlsx';
        read(foo, 'utf8', function(err, buffer) {
            //=> 'some contents...'
            alert(foo)
          });
        return (
            <div>
                Hello
            </div>
        )
    }
}
