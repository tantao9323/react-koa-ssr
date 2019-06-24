import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as detailActions from '../../redux/actions/detail';
import Loading from '../../components/loading';
import styles from './index.less';

const mapStateToProps = state => ({ ...state.detail });

const mapDispatchToProps = dispatch => ({
  fetchDetail: id => dispatch(detailActions.fetchDetail(id)),
  reset: () => dispatch(detailActions.reset()),
});

class Detail extends React.Component {
  static asyncData(store, match) {
    const { fetchDetail } = mapDispatchToProps(store.dispatch);
    return fetchDetail(match.params.id);
  }

  componentDidMount() {
    const { fetchDetail, match, data } = this.props;
    if (!data) {
      fetchDetail(match.params.id);
    }
  }

  componentWillUnmount() {
    const { reset } = this.props;
    reset();
  }

  render() {
    const { data, loaded } = this.props;
    const page = loaded ? (
      <Loading />
    ) : (
      // eslint-disable-next-line react/no-danger
      <section className={styles['article-body']} dangerouslySetInnerHTML={{ __html: data }} />
    );
    return <Fragment>{page}</Fragment>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
