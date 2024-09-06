import React from "react";

interface ServiceProps {
  title: string;
  total: number;
  price: number;
}

export const StaticServiceRow: React.FC<{ service: ServiceProps }> = ({
  service,
}) => (
  <tr>
    <td
      colSpan={3}
      className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base"
    >
      {service.title}
    </td>
    <td
      colSpan={1}
      className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base"
    >
      {service.total}
    </td>
    <td
      colSpan={1}
      className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base"
    >
      <span>$</span>
      <span className="md:ms-1">{service.price.toFixed(2)}</span>
    </td>
    <td
      colSpan={1}
      className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base"
    >
      <span>$</span>
      <span className="md:ms-1">
        {(service.total * service.price).toFixed(2)}
      </span>
    </td>
  </tr>
);

export const PortNumbersRow: React.FC<{ portNumbers: string[] }> = ({
  portNumbers,
}) => (
  <tr>
    <td
      colSpan={3}
      className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base"
    >
      Port Numbers{" "}
      {portNumbers.map((port, index) => (
        <span key={index} className="font-normal">
          {" "}
          | {port}
        </span>
      ))}
    </td>
    <td
      colSpan={1}
      className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base"
    >
      {Math.max(0, portNumbers.length - 2)}
    </td>
    <td
      colSpan={1}
      className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base"
    >
      $ 2.00
    </td>
    <td
      colSpan={1}
      className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base"
    >
      $ {Math.max(0, (portNumbers.length - 2) * 2).toFixed(2)}
    </td>
  </tr>
);

interface ProductProps {
  id: string;
  title: string;
  description: string;
  total: number;
  quantity: number;
  price: number;
}

export const ProductRow: React.FC<{
  product: ProductProps;
  isStatic: boolean;
}> = ({ product, isStatic }) => (
  <tr>
    <td
      colSpan={3}
      className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base"
    >
      {product.title} |{" "}
      <small className="font-normal"> {product.description}</small>
    </td>
    <td
      colSpan={1}
      className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base"
    >
      {isStatic ? product.total : product.quantity}
    </td>
    <td
      colSpan={1}
      className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base"
    >
      <span>$</span>
      <span className="md:ms-1">{Number(product.price).toFixed(2)}</span>
    </td>
    <td
      colSpan={1}
      className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base"
    >
      ${" "}
      {Number(
        isStatic
          ? product.total * product.price
          : product.quantity * product.price
      ).toFixed(2)}
    </td>
  </tr>
);
