﻿using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Calculator.Web.Converters
{
    public class DoubleConverter : JsonConverter<double>
    {
        public override double Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String && reader.GetString() == "NaN")
            {
                return double.NaN;
            }

            return reader.GetDouble(); // JsonException thrown if reader.TokenType != JsonTokenType.Number
        }

        public override void Write(Utf8JsonWriter writer, double value, JsonSerializerOptions options)
        {
            if (double.IsNaN(value))
            {
                writer.WriteStringValue("NaN");
            }
            else if (double.IsInfinity(value))
            {
                writer.WriteStringValue("Infinity");
            }
            else
            {
                writer.WriteNumberValue(value);
            }
        }
    }
}
