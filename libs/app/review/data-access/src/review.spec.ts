import { appReviewDataAccess } from './review.api';

describe('appReviewDataAccess', () => {
  it('should work', () => {
    expect(appReviewDataAccess()).toEqual('app-review-data-access');
  });
});
