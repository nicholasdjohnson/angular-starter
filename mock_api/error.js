module.exports = {

  /**
   *
   * @param {Response} res
   * @param {number} type
   * @returns {Response}
   */
  error: function (res, type) {
    return res.sendStatus(type);
  }

}
