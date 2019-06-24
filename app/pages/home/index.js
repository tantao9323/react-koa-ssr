import React from 'react';
import { connect } from 'react-redux';
import * as homeActions from '../../redux/actions/home';
import New from '../../components/new';
import Top from '../../components/top';
import TabBar from '../../components/tab-bar';
import Column from '../../components/column';

const mapStateToProps = state => ({ ...state.home });

const mapDispatchToProps = dispatch => ({
  fetchHome: id => dispatch(homeActions.fetchHome(id)),
  fetchColumn: page => dispatch(homeActions.fetchColumn(page)),
});

class Home extends React.Component {
  static asyncData(store) {
    const { fetchHome, fetchColumn } = mapDispatchToProps(store.dispatch);
    return Promise.all([fetchHome(), fetchColumn()]);
  }

  constructor(props) {
    super(props);
    const { column } = props;
    this.state = {
      tabs: [{ title: '科技新闻', index: 0 }, { title: '24h快讯', index: 1 }],
      columnPage: column.length > 0 ? 1 : 0,
    };
  }

  handlerReachBottom = (id) => {
    const { fetchHome } = this.props;
    fetchHome(id);
  };

  handlerColumnReachBottom = () => {
    const { fetchColumn } = this.props;
    const { columnPage } = this.state;
    this.setState(
      state => ({ ...state, columnPage: state.columnPage + 1 }),
      () => {
        fetchColumn(columnPage);
      },
    );
  };

  render() {
    const {
      loaded, news, column, columnLoaded,
    } = this.props;
    const { tabs } = this.state;
    return (
      <div>
        <Top />
        <TabBar tabs={tabs}>
          <Column
            loaded={columnLoaded}
            data={column}
            onReachBottom={this.handlerColumnReachBottom}
          />
          <New loaded={loaded} data={news} onReachBottom={this.handlerReachBottom} />
        </TabBar>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
