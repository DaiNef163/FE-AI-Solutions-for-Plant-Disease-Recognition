import PropTypes from "prop-types";
export const formatCurrencyVND = (value) => value.toLocaleString("vi", { style: "currency", currency: "VND" });

formatCurrencyVND.propTypes = {
    value: PropTypes.number.isRequired,
};
